import React from 'react';
import styles from './StepItem.module.css';

export interface StepItemProps {
  stepNumber: string;
  title: string;
  description: string;
}

export const StepItem: React.FC<StepItemProps> = ({ stepNumber, title, description }) => {
  return (
    <div className="d-flex flex-column h-100">
      {/* Línea verde superior de acento */}
      <div className={styles.topBar}></div>
      
      {/* Número del paso */}
      <span className={`fw-semibold mb-3 ${styles.stepNumber}`}>{stepNumber}</span>

      {/* Título */}
      <h4 className="fw-bold text-white mb-2" style={{ fontSize: '1.25rem' }}>
        {title}
      </h4>

      {/* Descripción */}
      <p className="text-secondary small mb-0 lh-base" style={{ color: '#94a3b8' }}>
        {description}
      </p>
    </div>
  );
};