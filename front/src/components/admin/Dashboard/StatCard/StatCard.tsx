import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext: string;
  isHighlight?: boolean;
  hasBorder?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  isHighlight = false,
  hasBorder = false,
}) => {
  return (
    <div
      className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100"
      style={{
        outline: hasBorder ? '1.5px solid #a7f3d0' : 'none',
      }}
    >
      <span
        className="text-muted fw-bold text-uppercase d-block mb-1"
        style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}
      >
        {label}
      </span>
      <div
        className={`h3 fw-bold mb-1 ${isHighlight ? 'text-teal' : 'text-dark'}`}
        style={{ color: isHighlight ? '#0b9982' : undefined }}
      >
        {value}
      </div>
      <span className="text-muted" style={{ fontSize: '0.725rem' }}>
        {subtext}
      </span>
    </div>
  );
};