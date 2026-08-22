import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'light' | 'dark' | 'outline';
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-sm btn-light text-secondary rounded-pill me-2 mb-1 px-3 py-1 border-0 fw-medium"
      style={{ fontSize: '0.85rem', backgroundColor: '#f1f5f9' }}
    >
      {label}
    </button>
  );
};