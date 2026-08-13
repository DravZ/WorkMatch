import React from 'react';
import styles from './JobCard.module.css';

export interface JobCardProps {
  title: string;
  company: string;
  location: string;
  schedule: string;
  payRate: string;
  isUrgent?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  schedule,
  payRate,
  isUrgent = false,
}) => {
  return (
    <div className={`card border-0 mb-3 p-3 ${styles.jobCard}`}>
      <div className="card-body p-0">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '1rem' }}>
            {title}
          </h6>
          <span className={`fw-bold ${styles.payRate}`}>{payRate}</span>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="text-muted small mb-0">{company}</p>
          {isUrgent && (
            <span className={`badge rounded-pill ${styles.badgeUrgent}`}>
              Urgent
            </span>
          )}
        </div>

        <div className="d-flex gap-3 text-secondary small align-items-center mt-3">
          <span>📍 {location}</span>
          <span>📅 {schedule}</span>
        </div>
      </div>
    </div>
  );
};