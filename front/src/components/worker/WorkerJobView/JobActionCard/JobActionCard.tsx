import React, { useState } from 'react';
import styles from './JobActionCard.module.css';

interface JobActionCardProps {
  hourlyRate: number;
  estimatedEarnings: number;
  postedDate: string;
  spotsRemaining: number;
  onApply?: () => void;
}

export const JobActionCard: React.FC<JobActionCardProps> = ({
  hourlyRate,
  estimatedEarnings,
  postedDate,
  spotsRemaining,
  onApply,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="card border-0 shadow-sm p-4 rounded-4 mb-3 text-center">
      <div className="mb-3">
        <span className="display-6 fw-bold text-teal">${hourlyRate}</span>
        <span className="text-muted small">/hr</span>
        <p className="text-muted extra-small mb-0 mt-1">
          Est. ${estimatedEarnings} for full day shift
        </p>
      </div>

      <div className="d-flex flex-column gap-2 mb-3">
        <button
          type="button"
          onClick={onApply}
          className={`btn w-100 py-2.5 fw-semibold ${styles.btnApply}`}
        >
          Apply now
        </button>

        <button
          type="button"
          onClick={() => setIsSaved(!isSaved)}
          className={`btn w-100 py-2 ${styles.btnSave}`}
        >
          {isSaved ? '♥ Saved' : '♡ Save job'}
        </button>
      </div>

      <div className="text-muted extra-small d-flex flex-column gap-1">
        <span>Posted: {postedDate}</span>
        <span>{spotsRemaining} spots remaining</span>
      </div>
    </div>
  );
};