import React from 'react';
import styles from './JobHeaderCard.module.css';

interface JobHeaderCardProps {
  title: string;
  companyName: string;
  isVerified?: boolean;
  hourlyRate: number;
  location: string;
  distance: string;
  date: string;
  schedule: string;
  spotsLeft: number;
  totalSpots: number;
}

export const JobHeaderCard: React.FC<JobHeaderCardProps> = ({
  title,
  companyName,
  isVerified = true,
  hourlyRate,
  location,
  distance,
  date,
  schedule,
  spotsLeft,
  totalSpots,
}) => {
  return (
    <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">{title}</h1>
          <div className="d-flex align-items-center gap-2">
            <span className="text-teal fw-semibold small">✓ {companyName}</span>
            {isVerified && <span className={styles.verifiedBadge}>Verified</span>}
          </div>
        </div>
        <div className="text-end">
          <span className="h2 fw-bold text-teal mb-0">${hourlyRate}</span>
          <span className="text-muted extra-small d-block">per hour</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className={`p-3 rounded-3 ${styles.detailsGrid}`}>
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <span className={styles.detailLabel}>📍 LOCATION</span>
            <span className={styles.detailValue}>{location}</span>
          </div>
          <div className="col-6 col-md-2">
            <span className={styles.detailLabel}>🏃 DISTANCE</span>
            <span className={styles.detailValue}>{distance}</span>
          </div>
          <div className="col-6 col-md-3">
            <span className={styles.detailLabel}>📅 DATE</span>
            <span className={styles.detailValue}>{date}</span>
          </div>
          <div className="col-6 col-md-2">
            <span className={styles.detailLabel}>⏰ SCHEDULE</span>
            <span className={styles.detailValue}>{schedule}</span>
          </div>
          <div className="col-6 col-md-2">
            <span className={styles.detailLabel}>👥 SPOTS LEFT</span>
            <span className={styles.detailValue}>
              {spotsLeft} of {totalSpots}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};