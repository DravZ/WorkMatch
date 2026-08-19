import React from 'react';

export type StatusType = 'open' | 'urgent' | 'Active' | 'Pending' | 'reviewing' | 'Resolved' | 'open_capital';

interface StatusBadgeProps {
  status: StatusType;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'open':
      case 'Active':
      case 'Resolved':
      case 'open_capital':
        return { bg: '#e6f7f4', color: '#0b9982', label: status === 'open_capital' ? 'Open' : status };
      case 'urgent':
        return { bg: '#e0f2fe', color: '#0284c7', label: 'urgent' };
      case 'Pending':
      case 'reviewing':
        return { bg: '#fef3c7', color: '#d97706', label: status === 'reviewing' ? 'reviewing' : status };
      default:
        return { bg: '#f1f5f9', color: '#64748b', label: status };
    }
  };

  const style = getBadgeStyle();

  return (
    <span
      className="badge px-2.5 py-1 rounded-pill fw-medium"
      style={{
        backgroundColor: style.bg,
        color: style.color,
        fontSize: '0.65rem',
      }}
    >
      {style.label}
    </span>
  );
};