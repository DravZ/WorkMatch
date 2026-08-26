import React, { useEffect, useState } from 'react';
import styles from './Applications.module.css';
import { ApplicationCard, type ApplicationData } from '../../../components/worker/Applications/ApplicationCard/ApplicationCard';
import type { StatusType } from '../../../components/worker/Dashboard/StatusBadge/StatusBadge_W';
import { useUser } from '../../../context/UserContext/UserContext';
import { usePostulacionController } from '../../../controllers/postulacion.controller';

type TabType = 'All' | 'Pending' | 'Accepted' | 'Rejected';

export const Applications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const { user } = useUser();
  const postulacionController = usePostulacionController();

  const [postulaciones, setPostulaciones] = useState([])

  const applicationsData: ApplicationData[] = [
    {
      id: '1',
      title: 'Warehouse Picker & Packer',
      company: 'Metro Logistics Co.',
      location: 'Brooklyn, NY',
      rate: '$22/hr',
      jobDate: '2026-08-15',
      appliedDate: '2026-08-10',
      note: 'I have 6 years of warehouse experience and am forklift certified. Available for your start date.',
      status: 'Accepted' as StatusType,
      filterGroup: 'Accepted',
    },
    {
      id: '2',
      title: 'Event Setup Crew',
      company: 'Prestige Events Group',
      location: 'Manhattan, NY',
      rate: '$25/hr',
      jobDate: '2026-08-16',
      appliedDate: '2026-08-11',
      note: 'Available for the full Saturday shift. I have prior event setup experience.',
      status: 'Accepted' as StatusType,
      filterGroup: 'Accepted',
    },
    {
      id: '3',
      title: 'Restaurant Kitchen Helper',
      company: 'Osteria Morandi',
      location: 'West Village, NY',
      rate: '$18/hr',
      jobDate: '2026-08-15',
      appliedDate: '2026-08-12',
      note: 'I have kitchen safety training and can start immediately.',
      status: 'Under review' as StatusType,
      filterGroup: 'Pending',
    },
    {
      id: '4',
      title: 'Office Cleaning — Midtown',
      company: 'CleanSpace Partners',
      location: 'Midtown, NY',
      rate: '$240 fixed',
      jobDate: '2026-08-08',
      appliedDate: '2026-08-05',
      note: 'Experienced cleaner with commercial references.',
      status: 'Not selected' as StatusType,
      filterGroup: 'Not selected',
    },
  ];

  // Cálculo de conteos dinámicos
  const counts = {
    All: postulaciones.length,
    Pending: postulaciones.filter((a: any) => a.estado === 'pendiente').length,
    Accepted: postulaciones.filter((a: any) => a.estado === 'aceptada' || a.estado === 'en_proceso').length,
    Rejected: postulaciones.filter((a: any) => a.estado === 'rechazada' || a.estado === 'revocada').length,
  };

  // Filtrado de la lista según la pestaña activa
  const filteredApplications = postulaciones.filter((app:any) => {
    if (activeTab === 'All') return true;
    else if (activeTab == 'Pending' && (app.estado === "pendiente")) return true;
    else if (activeTab == 'Accepted' && (app.estado === "aceptada" || app.estado === "en_proceso")) return true;
    else if (activeTab == 'Rejected' && (app.estado === "revocada" || app.estado === "rechazada")) return true;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;

        const respPostulaciones =
          await postulacionController.getByUsuario(user.id);

        setPostulaciones(respPostulaciones)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="min-vh-100 bg-light">

      <main className="container py-4" style={{ maxWidth: '900px' }}>
        {/* Encabezado */}
        <div className="mb-4">
          <h1 className="h3 fw-bold text-dark mb-1">My applications</h1>
          <p className="text-muted small mb-0">{counts.All} total applications</p>
        </div>

        {/* Barra de Pestañas (Tabs) */}
        <div className={`p-1 mb-4 bg-white d-flex align-items-center ${styles.tabContainer}`}>
          {(['All', 'Pending', 'Accepted', 'Rejected'] as TabType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`btn flex-fill py-2 ${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''
                }`}
            >
              {tab}
              {tab !== 'All' && <span className="ms-1 opacity-75">{counts[tab]}</span>}
            </button>
          ))}
        </div>

        {/* Lista de Aplicaciones */}
        <div>
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app: any) => (
              <ApplicationCard
                key={app.id_postulacion}
                application={{
                  id: app?.id_postulacion,
                  title: app?.vacante?.titulo,
                  company: app?.vacante?.empresa?.nombre_empresa,
                  location: app?.vacante?.ubicacion,
                  rate: app?.vacante?.salario,
                  jobDate: app?.vacante?.fecha_inicio,
                  appliedDate: app?.fecha_postulacion,
                  note: '',
                  status: app?.estado == "pendiente" ? "Pending" :
                        app?.estado == "aceptada" ? "Accepted" :
                          app?.estado == "rechazada" ? "Not selected" :
                            app?.estado == "revocada" ? "Revoked" :
                              app?.estado == "en_proceso" ? "In Progress" :
                                app?.estado == "finalizada" ? "Finalized" :
                                  "Not selected",
                  filterGroup:app?.estado == "pendiente" ? "Pending" :
                        app?.estado == "aceptada" ? "Accepted" :
                          app?.estado == "rechazada" ? "Not selected" :
                            app?.estado == "revocada" ? "Revoked" :
                              app?.estado == "en_proceso" ? "In Progress" :
                                app?.estado == "finalizada" ? "Finalized" :
                                  "Not selected"
                }}
                onViewJob={(id) => console.log('View job:', id)}
                onMessageEmployer={(id) => console.log('Message employer:', id)}
              />
            ))
          ) : (
            <div className="text-center py-5 bg-white rounded-3">
              <p className="text-muted mb-0">No applications found in this status.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};