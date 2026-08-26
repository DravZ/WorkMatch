import React from 'react';
import styles from './ApplicationCard.module.css';
import { StatusBadge_W, type StatusType } from '../../Dashboard/StatusBadge/StatusBadge_W';

export interface ApplicationData {
  id: string;
  title: string;
  company: string;
  location: string;
  rate: string;
  jobDate: string;
  appliedDate: string;
  note: string;
  status: StatusType;
  filterGroup: 'Confirmed' | 'Accepted' | 'Pending' |
  'In Progress' | 'Revoked' | 'Not selected' | 'Urgent' | 'Finalized';
}

interface ApplicationCardProps {
  application: ApplicationData;
  onViewJob?: (id: string) => void;
  onMessageEmployer?: (id: string) => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onViewJob,
  onMessageEmployer,
}) => {
  return (
    <div className={`p-4 bg-white mb-3 ${styles.card}`}>
      {/* Header con Título y Estado */}
      <div className="d-flex justify-content-between align-items-start mb-1">
        <div>
          <h3 className="fw-bold text-dark fs-5 mb-0">{application.title}</h3>
          <p className="text-muted small mb-2">{application.company}</p>
        </div>
        <StatusBadge_W status={application.status} />
      </div>

      {/* Metadatos (Ubicación, Pago, Fechas) */}
      <div className="d-flex flex-wrap gap-3 text-muted small mb-3">
        <span className="d-flex align-items-center gap-1">📍 {application.location}</span>
        <span className="d-flex align-items-center gap-1">💵 ${application.rate}</span>
        <span className="d-flex align-items-center gap-1">📅 Job date:
          {application.jobDate}</span>
        <span className="text-secondary">Applied:
          {new Date(application.appliedDate).toLocaleString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
      </div>

      {/* Nota / Mensaje adjunto 
      {application.note && (
        <div className={`p-3 mb-3 ${styles.noteBox}`}>
          <p className="fst-italic text-secondary small mb-0">"{application.note}"</p>
        </div>
      )}*/}

      {/* Botones de Acción */}
      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          onClick={() => onViewJob && onViewJob(application.id)}
          className={`btn ${styles.btnViewJob}`}
        >
          View job
        </button>

        {application.status === 'Accepted' && (
          <button
            type="button"
            onClick={() => onMessageEmployer && onMessageEmployer(application.id)}
            className={`btn ${styles.btnMessage}`}
          >
            Message employer
          </button>
        )}
      </div>
    </div>
  );
};