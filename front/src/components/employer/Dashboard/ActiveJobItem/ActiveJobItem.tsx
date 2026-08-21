import React from 'react';
import styles from './ActiveJobItem.module.css';

interface ActiveJobItemProps {
  title: string;
  location: string;
  schedule: string;
  spotsLeft: number;
  totalSpots: number;
  isUrgent?: boolean;
  onViewApps?: () => void;
}

export const ActiveJobItem: React.FC<ActiveJobItemProps> = ({
  title,
  location,
  schedule,
  spotsLeft,
  totalSpots,
  isUrgent = false,
  onViewApps,
}) => {
  return (
    <div className={`p-3 rounded-3 mb-2 d-flex justify-content-between align-items-center ${styles.jobContainer}`}>
      <div>
        <h2 className="h6 fw-bold text-dark mb-1">{title}</h2>
        <p className="text-muted extra-small mb-1">
          {location} · {schedule}
        </p>
        <span className="text-muted extra-small fw-medium">
          {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left of {totalSpots}
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        {isUrgent && <span className={styles.urgentBadge}>Urgent</span>}
        <button
          type="button"
          onClick={onViewApps}
          className={`btn btn-sm ${styles.btnViewApps}`}
        >
          View apps
        </button>
      </div>
    </div>
  );
};