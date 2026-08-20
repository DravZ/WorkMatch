import React from 'react';

type StatusType = 'accepted' | 'pending' | 'rejected' | 'verified';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const statusStyles: Record<StatusType, { bg: string; color: string; defaultLabel: string }> = {
  accepted: { bg: '#ecfdf5', color: '#10b981', defaultLabel: 'Accepted' },
  pending: { bg: '#fffbeb', color: '#d97706', defaultLabel: 'Under review' },
  rejected: { bg: '#f1f5f9', color: '#64748b', defaultLabel: 'Not selected' },
  verified: { bg: '#e6f7f4', color: '#0b9982', defaultLabel: 'Verified' },
};

export const StatusBadgeApp: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const style = statusStyles[status];

  return (
    <span
      className="badge rounded-pill fw-medium extra-small"
      style={{
        backgroundColor: style.bg,
        color: style.color,
        fontSize: status === 'verified' ? '0.65rem' : '0.75rem',
        padding: status === 'verified' ? '3px 8px' : '6px 12px',
      }}
    >
      {label || style.defaultLabel}
    </span>
  );
};