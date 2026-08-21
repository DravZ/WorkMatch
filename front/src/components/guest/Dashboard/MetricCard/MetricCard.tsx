import React from 'react';
import styles from './MetricCard.module.css';

export interface MetricCardProps {
  value: string;
  label: string;
  subtext: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ value, label, subtext }) => {
  return (
    <div className={`card border-0 p-3 h-100 ${styles.metricCard}`}>
      <div className="card-body p-1 d-flex flex-column justify-content-between">
        <h3 className={`fw-extrabold mb-2 ${styles.metricValue}`}>
          {value}
        </h3>
        <div>
          <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.9rem' }}>
            {label}
          </h6>
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>
            {subtext}
          </span>
        </div>
      </div>
    </div>
  );
};