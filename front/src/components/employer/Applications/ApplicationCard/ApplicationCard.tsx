import React from 'react'; import { StatusBadgeApp } from '../StatusBadgeApp/StatusBadgeApp';
import { AvatarApp } from '../AvatarApp/AvatarApp';

interface Skill {
  id_habilidad: number,
  nombre: string
}

export interface Application {
  id: string;
  initials: string;
  name: string;
  rating: number;
  jobsCompleted: number;
  isVerified: boolean;
  appliedJob: string;
  appliedDate: string;
  coverLetter: string;
  skills: Skill[];
  status: 'pending' | 'accepted' | 'rejected' | 'in progress' | 'finalized';
}

interface ApplicationCardProps {
  app: Application;
  onStatusChange: (id: string, newStatus: 'accepted' | 'rejected' | 'pending' | 'revoke' | 'finalize') => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ app, onStatusChange }) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
      {/* Header: Avatar, Info del usuario y Badge de Estado */}
      <div className="d-flex align-items-start justify-content-between mb-3">
        <div className="d-flex align-items-center gap-3">
          <AvatarApp initials={app.initials} />

          <div>
            <h2 className="h6 fw-bold text-dark mb-1">{app.name}</h2>

            <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
              {/*<div className="d-flex align-items-center text-teal extra-small">
                {'★'.repeat(5)}
              </div>
              <span className="text-muted extra-small fw-medium">
                {app.rating} · {app.jobsCompleted} jobs completed
              </span> */}
              {app.isVerified && <StatusBadgeApp status="verified" />}
            </div>

            <div className="text-muted extra-small">
              <p className='text-muted extra-small'>Applied for: {app.appliedJob} </p>
              <p className='text-muted extra-small'>{new Date(app.appliedDate).toLocaleString('es-MX', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>

            </div>
          </div>
        </div>

        {/* Badge superior derecho según el estado 
        'pending' | 'accepted' | 'rejected' | 'in progress' | 'finalized';*/}

        <StatusBadgeApp status={app.status == 'pending' ? 'pending' :
          app.status == "accepted" ? 'accepted' :
            app.status == "rejected" ? 'rejected' :
              app.status == "in progress" ? 'in-progress' :
                app.status == 'finalized' ? 'finalized' : 'pending'
        } />
      </div>

      {/* Carta de presentación (Cover letter) */}
      <div className="bg-light p-3 rounded-3 mb-3 text-secondary extra-small fst-italic">
        "{app.coverLetter}"
      </div>

      {/* Etiquetas de Habilidades (Skills) */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {app.skills.map((skill, index) => (
          <span
            key={index}
            className="badge fw-medium text-dark bg-light border-0 rounded-pill px-3 py-2 extra-small"
            style={{ fontSize: '0.7rem' }}
          >
            {skill.nombre}
          </span>
        ))}
      </div>

      {/* Botones de Acción condicionales según el Estado */}
      <div className="d-flex align-items-center gap-2">
        {/* CASO 1: PENDIENTE (Under review) -> Accept + Decline + View profile + Message */}
        {app.status === 'pending' && (
          <>
            <button
              onClick={() => onStatusChange(app.id, 'accepted')}
              className="btn text-white px-3 py-1.5 fw-semibold rounded-3 extra-small"
              style={{ backgroundColor: '#0b9982' }}
            >
              Accept
            </button>
            <button
              onClick={() => onStatusChange(app.id, 'rejected')}
              className="btn btn-outline-secondary px-3 py-1.5 fw-semibold rounded-3 extra-small bg-white text-dark border-light-subtle"
            >
              Decline
            </button>
          </>
        )}

        {/* CASO 2: ACEPTADO (Accepted) -> Revoke acceptance + View profile + Message */}
        {app.status === 'accepted' && (
          <button
            onClick={() => onStatusChange(app.id, 'revoke')}
            className="btn btn-outline-secondary px-3 py-1.5 fw-semibold rounded-3 extra-small bg-white text-dark border-light-subtle"
          >
            Revoke acceptance
          </button>
        )}

        {/* CASO 3: EN PROGRESO (Accepted) -> Revoke acceptance + View profile + Message */}
        {app.status === 'in progress' && (
          <button
            onClick={() => onStatusChange(app.id, 'finalize')}
            className="btn btn-outline-secondary px-3 py-1.5 fw-semibold rounded-3 extra-small bg-white text-dark border-light-subtle"
          >
            Revoke acceptance
          </button>
        )}

        {/* CASO 4: RECHAZADO (Not selected) -> No lleva botón primario, sólo pasa a las acciones de enlace */}

        {/* Acciones comunes a todos los estados (View profile y Message) */}
        <a
          href={`/employer/applicant/${app.id}`}
          className="btn btn-link text-decoration-none text-dark extra-small fw-semibold ms-1"
        >
          View profile
        </a>
        <a
          href={`/messages/${app.id}`}
          className="btn btn-link text-decoration-none text-muted extra-small fw-semibold"
        >
          Message
        </a>
      </div>
    </div>
  );
};