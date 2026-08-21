import React from 'react';

export interface FeatureItemProps {
  icon: string | React.ReactNode;
  title: string;
  description: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <div className="d-flex align-items-start gap-3">
      <div 
        className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
        style={{ width: '40px', height: '40px', backgroundColor: '#f0fdf4', fontSize: '1.1rem' }}
      >
        {icon}
      </div>
      <div>
        <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '0.95rem' }}>
          {title}
        </h6>
        <p className="text-secondary small mb-0 leading-tight">
          {description}
        </p>
      </div>
    </div>
  );
};