import React, { useEffect, useState } from 'react';
import { FilterTabs, type TabOption } from '../../../components/employer/Applications/FilterTabs/FilterTabs';
import { ApplicationCard, type Application } from '../../../components/employer/Applications/ApplicationCard/ApplicationCard';
import { useUser } from '../../../context/UserContext/UserContext';
import { usePostulacionController } from '../../../controllers/postulacion.controller';
import { EstadoPostulacion } from '../../../types/estadoPostulacion';

type TabType = 'all' | 'pending' | 'accepted' | 'rejected';

export const EmployerApplications: React.FC = () => {
  const { user } = useUser();
  const postulacionController = usePostulacionController();

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [postulaciones, setPostulaciones] = useState([]);

  const pendingCount = postulaciones.filter((a: any) => a.estado === 'pendiente').length;
  const acceptedCount = postulaciones.filter((a: any) => a.estado === 'aceptada' || a.estado === 'en_proceso').length;
  const rejectedCount = postulaciones.filter((a: any) => a.estado === 'rechazada' || a.estado === 'revocada').length;


  const tabs: TabOption<TabType>[] = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending', count: pendingCount },
    { id: 'accepted', label: 'Accepted', count: acceptedCount },
    { id: 'rejected', label: 'Rejected', count: rejectedCount },
  ];



  const filteredApplications = postulaciones.filter((app: any) => {
    if (activeTab === 'all') return true;
    else if (activeTab == 'pending' && (app.estado === "pendiente")) return true;
    else if (activeTab == 'accepted' && (app.estado === "aceptada" || app.estado === "en_proceso")) return true;
    else if (activeTab == 'rejected' && (app.estado === "revocada" || app.estado === "rechazada")) return true;
    return false;
  });

  const getInitials = (name?: string): string => {
    if (!name) return '';
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };

  const aceptarPostulacion = async (id: number) =>{
    try{
      await postulacionController.aceptar(id);
      await fetchData();
    }catch(er){
      console.log("ERROR: " + er)
    }
  }

  const rechazarPostulacion = async (id: number) =>{
    try{
      await postulacionController.rechazar(id);
      await fetchData();
    }catch(er){
      console.log("ERROR: " + er)
    }
  }

  const revocarPostulacion = async (id: number) =>{
    try{
      await postulacionController.revocar(id);
      await fetchData();
    }catch(er){
      console.log("ERROR: " + er)
    }
  }

  const finalizarPostulacion = async (id: number) =>{
    try{
      await postulacionController.finalizar(id)
      await fetchData();
    }catch(er){
      console.log("ERROR: " + er)
    }
  }

  const handleStatusChange = (
    id: string,
    newStatus: 'accepted' | 'rejected' | 'pending' | 'revoke' | 'finalize'
  ) => {
    console.log(newStatus + "for application id " + id)

    if(newStatus == 'accepted'){
      aceptarPostulacion(Number(id))
    }
    if(newStatus == 'rejected'){
      rechazarPostulacion(Number(id))
    }
    if(newStatus == 'revoke'){
      revocarPostulacion(Number(id))
    }

    if(newStatus == 'finalize'){
      finalizarPostulacion(Number(id))
    }
  };

  const fetchData = async () => {
    try {
      if (!user || !user.empresaId) return;

      const respPostulaciones =
        await postulacionController.getByEmpresa(user.empresaId);
      console.log(respPostulaciones)

      setPostulaciones(respPostulaciones)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
  }, [postulaciones]);

  return (
    <div className="min-vh-100 bg-light py-5 px-3">
      <div className="container max-w-3xl mx-auto" style={{ maxWidth: '820px' }}>
        <header className="mb-4 text-start">
          <h1 className="h3 fw-bold text-dark mb-1">Applications received</h1>
          <p className="text-muted small mb-0">
            {postulaciones.length} total — {pendingCount} pending review
          </p>
        </header>

        {/* Pestañas Reutilizables */}
        <FilterTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {/* Lista de Solicitudes */}
        <div className="d-flex flex-column gap-3">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-4 border-0 shadow-sm text-muted extra-small">
              No applications found in this section.
            </div>
          ) : (
            filteredApplications.map((app: any) => (
              <ApplicationCard
                key={app.id_postulacion}
                app={{
                  id: app.id_postulacion,
                  initials: getInitials(app.usuario.fullName),
                  name: app.usuario.fullName,
                  rating: app.vacante.salario,
                  jobsCompleted: app.usuario.trabajos_completados,
                  isVerified: app.usuario.trabajador.is_verified,
                  appliedJob: app.vacante.titulo,
                  appliedDate: app.fecha_postulacion,
                  coverLetter: app.usuario.trabajador.acercaDe,
                  skills: app.usuario.trabajador.habilidades,
                  status: app.estado == EstadoPostulacion.ACEPTADA ? "accepted":
                    app.estado == EstadoPostulacion.EN_PROCESO ? "in progress":
                      app.estado == EstadoPostulacion.FINALIZADA ? "finalized":
                        app.estado == EstadoPostulacion.PENDIENTE ? "pending":
                          app.estado == EstadoPostulacion.RECHAZADA ? "rejected":
                            app.estado == EstadoPostulacion.REVOCADA ? "rejected":
                            "in progress",
                }}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};