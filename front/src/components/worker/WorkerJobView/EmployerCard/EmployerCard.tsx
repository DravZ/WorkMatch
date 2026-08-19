import React from 'react';
import styles from './EmployerCard.module.css';

interface EmployerCardProps {
  companyName: string;
  initials: string;
  rating: number;
  reviewsCount: number;
  onViewProfile?: () => void;
}

export const EmployerCard: React.FC<EmployerCardProps> = ({
  companyName,
  initials,
  rating,
  reviewsCount,
  onViewProfile,
}) => {
  return (
    <div className="card border-0 shadow-sm p-4 rounded-4">
      <span className="text-muted uppercase extra-small fw-bold mb-3 d-block">
        ABOUT THE EMPLOYER
      </span>

      <div className="d-flex align-items-center gap-3 mb-3">
        <div className={styles.employerAvatar}>{initials}</div>
        <div>
          <h3 className="h6 fw-bold text-dark mb-1">{companyName}</h3>
          <div className="text-warning extra-small fw-semibold">
            ★★★★★ <span className="text-muted fw-normal">{rating} · {reviewsCount} reviews</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onViewProfile}
        className={`btn w-100 py-2 ${styles.btnProfile}`}
      >
        View profile
      </button>
    </div>
  );
};