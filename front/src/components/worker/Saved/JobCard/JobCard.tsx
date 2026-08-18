import React from 'react';
import styles from './JobCard.module.css';

export interface Job {
  id: string;
  category: string;
  title: string;
  company: string;
  pay: string;
  location: string;
  schedule: string;
  tags: string[];
  isSaved?: boolean;
}

interface JobCardProps {
  job: Job;
  onApply: (id: string) => void;
  onToggleSave: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, onToggleSave }) => {
  return (
    <div className={`card h-100 border-0 shadow-sm p-4 ${styles.jobCard}`}>
      {/* Header: Categoría y Pago */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className={styles.categoryLabel}>{job.category}</span>
        <span className={styles.payLabel}>{job.pay}</span>
      </div>

      {/* Titular y Empresa */}
      <h2 className="h5 fw-bold text-dark mb-1">{job.title}</h2>
      <p className="text-muted small mb-3">{job.company}</p>

      {/* Ubicación y Horario */}
      <div className="d-flex flex-wrap gap-3 text-muted extra-small mb-3">
        <span>📍 {job.location}</span>
        <span>📅 {job.schedule}</span>
      </div>

      {/* Badges / Tags */}
      <div className="d-flex flex-wrap gap-2 mb-4 flex-grow-1 align-content-start">
        {job.tags.map((tag, idx) => (
          <span key={idx} className={styles.tagBadge}>
            {tag}
          </span>
        ))}
      </div>

      {/* Acciones */}
      <div className="d-flex gap-2 align-items-center pt-2">
        <button
          type="button"
          onClick={() => onApply(job.id)}
          className={`btn w-100 ${styles.btnApply}`}
        >
          Apply now
        </button>
        <button
          type="button"
          onClick={() => onToggleSave(job.id)}
          className={`btn ${job.isSaved ? styles.btnHeartSaved : styles.btnHeart}`}
          aria-label="Save job"
        >
          ♥
        </button>
      </div>
    </div>
  );
};