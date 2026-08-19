import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => {
  return (
    <div className="text-center py-5 my-3">
      <div className={styles.iconWrapper}>{icon}</div>
      <h2 className="h5 fw-bold text-dark mb-2">{title}</h2>
      <p className="text-muted small mb-0 mx-auto" style={{ maxWidth: '360px' }}>
        {description}
      </p>
    </div>
  );
};