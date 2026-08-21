import React, { useState } from 'react';
import styles from './JobCard.module.css';
import { StatusBadge_W, type StatusType } from '../../Dashboard/StatusBadge/StatusBadge_W';

export interface JobData {
  id: string;
  title: string;
  category: string;
  company: string;
  isVerified?: boolean;
  companyInitials: string;
  companyBgColor?: string;
  rate: number;
  rateType?: string; // e.g. '/ hour'
  location: string;
  schedule: string;
  tags: string[];
  spots: number;
  postedAgo: string;
  statusTag: StatusType;
  isFavorite?: boolean;
}

interface JobCardProps {
  job: JobData;
  onApply?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, onToggleFavorite }) => {
  const [isFav, setIsFav] = useState(job.isFavorite || false);

  const handleFavoriteClick = () => {
    setIsFav(!isFav);
    if (onToggleFavorite) onToggleFavorite(job.id);
  };

  return (
    <div className={`p-4 bg-white d-flex flex-column justify-content-between h-100 ${styles.card}`}>
      <div>
        {/* Header de la tarjeta */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <StatusBadge_W status={job.statusTag} />
          <button 
            type="button" 
            onClick={handleFavoriteClick}
            className={`btn p-0 border-0 ${styles.favBtn} ${isFav ? styles.favActive : ''}`}
            aria-label="Save Job"
          >
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Título y Precio */}
        <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
          <h3 className="fw-bold text-dark fs-5 mb-0">{job.title}</h3>
          <div className="text-end">
            <span className="fw-bold fs-4 text-teal">${job.rate}</span>
            <span className="d-block text-muted extra-small">{job.rateType || '/ hour'}</span>
          </div>
        </div>
        <span className={styles.categoryLabel}>{job.category}</span>

        {/* Empresa */}
        <div className="d-flex align-items-center gap-2 my-3">
          <div 
            className={styles.companyLogo} 
            style={{ backgroundColor: job.companyBgColor || '#0f172a' }}
          >
            {job.companyInitials}
          </div>
          <div>
            <h4 className="fw-bold text-dark small mb-0">{job.company}</h4>
            {job.isVerified && <span className={styles.verifiedTag}>✓ Verified</span>}
          </div>
        </div>

        {/* Ubicación y Horario */}
        <div className="d-flex flex-wrap gap-3 text-muted small mb-3">
          <span className="d-flex align-items-center gap-1">📍 {job.location}</span>
          <span className="d-flex align-items-center gap-1">🕒 {job.schedule}</span>
        </div>

        {/* Tags de Habilidades */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag, idx) => (
            <span key={idx} className={styles.tagBadge}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer con Cupos y Botón Apply */}
      <div className="d-flex align-items-center justify-content-between pt-3 border-top border-light">
        <span className="text-muted small">
          {job.spots} {job.spots === 1 ? 'spot' : 'spots'} · {job.postedAgo}
        </span>
        <button
          type="button"
          onClick={() => onApply && onApply(job.id)}
          className={`btn px-3 py-2 fw-semibold ${styles.btnApply}`}
        >
          Apply now
        </button>
      </div>
    </div>
  );
};