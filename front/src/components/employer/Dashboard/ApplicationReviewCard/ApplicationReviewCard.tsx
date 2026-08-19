import React from 'react';
import styles from './ApplicationReviewCard.module.css';

interface ApplicationReviewCardProps {
  workerName: string;
  appliedRole: string;
  date: string;
  rating: number;
  jobsCount: number;
  isVerified?: boolean;
  comment: string;
  skills: string[];
  onAccept?: () => void;
  onDecline?: () => void;
  onViewProfile?: () => void;
}

export const ApplicationReviewCard: React.FC<ApplicationReviewCardProps> = ({
  workerName,
  appliedRole,
  date,
  rating,
  jobsCount,
  isVerified = false,
  comment,
  skills,
  onAccept,
  onDecline,
  onViewProfile,
}) => {
  return (
    <div className="card border-0 shadow-sm p-4 rounded-4 mb-3">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <h3 className="h6 fw-bold text-dark mb-0">{workerName}</h3>
          <span className="text-muted extra-small">Applied for: {appliedRole}</span>
        </div>
        <span className="text-muted extra-small">{date}</span>
      </div>

      <div className="d-flex align-items-center gap-2 mb-2 extra-small">
        <span className="text-warning fw-bold">★ {rating}</span>
        <span className="text-muted">· {jobsCount} jobs</span>
        {isVerified && <span className={styles.verifiedTag}>Verified</span>}
      </div>

      <p className="text-muted small mb-3 italic">"{comment}"</p>

      {/* Skills */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {skills.map((s, idx) => (
          <span key={idx} className="px-2.5 py-1 bg-light text-secondary rounded-2 extra-small fw-medium">
            {s}
          </span>
        ))}
      </div>

      {/* Acciones */}
      <div className="d-flex align-items-center gap-2">
        <button type="button" onClick={onAccept} className={`btn btn-sm ${styles.btnAccept}`}>
          Accept
        </button>
        <button type="button" onClick={onDecline} className={`btn btn-sm ${styles.btnDecline}`}>
          Decline
        </button>
        <button type="button" onClick={onViewProfile} className={`btn btn-sm ${styles.btnProfile}`}>
          View profile
        </button>
      </div>
    </div>
  );
};