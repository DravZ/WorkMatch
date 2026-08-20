import React from 'react';
import styles from './TimelineStep.module.css';

export interface TimelineStepProps {
  stepNumber: number;
  icon: string | React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  stepNumber,
  icon,
  title,
  description,
  isLast = false,
}) => {
  return (
    <div className={`d-flex ${styles.stepContainer}`}>
      {/* Columna Izquierda: Ícono Circular con Número y Línea Conectora */}
      <div className="d-flex flex-column align-items-center me-3 me-md-4 position-relative">
        {/* Ícono Circular */}
        <div className={`d-flex flex-column align-items-center justify-content-center ${styles.circleIcon}`}>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.stepNum}>{stepNumber}</span>
        </div>

        {/* Línea Vertical Conectora */}
        {!isLast && <div className={styles.connectorLine}></div>}
      </div>

      {/* Columna Derecha: Tarjeta con Título y Descripción */}
      <div className={`card border-0 p-3 p-md-4 w-100 mb-4 ${styles.stepCard}`}>
        <h5 className="fw-bold text-dark mb-2" style={{ fontSize: '1.1rem' }}>
          {title}
        </h5>
        <p className="text-secondary mb-0 lh-base" style={{ fontSize: '0.92rem', color: '#64748b' }}>
          {description}
        </p>
      </div>
    </div>
  );
};