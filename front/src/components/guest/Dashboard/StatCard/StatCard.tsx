import React from 'react';

interface StatCardProps {
  number: string;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <div>
      <h3 className="fw-bold text-dark mb-0">{number}</h3>
      <p className="text-muted small mb-0">{label}</p>
    </div>
  );
};