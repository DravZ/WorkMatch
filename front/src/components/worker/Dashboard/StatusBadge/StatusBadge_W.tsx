import React from 'react';
import styles from './StatusBadge_W.module.css';

export type StatusType = 'Confirmed' | 'Accepted' | 'Pending' | 'Not selected' | 'Urgent';

interface StatusBadgeProps {
  status: StatusType;
}

export const StatusBadge_W: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'Confirmed':
      case 'Accepted':
        return styles.accepted;
      case 'Pending':
        return styles.pending;
      case 'Not selected':
        return styles.notSelected;
      case 'Urgent':
        return styles.urgent;
      default:
        return styles.default;
    }
  };

  return <span className={`${styles.badge} ${getStatusClass()}`}>{status}</span>;
};