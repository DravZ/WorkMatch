import React from 'react';

interface MonthlySummaryCardProps {
  hiredCount: number;
  jobsCount: number;
  avgRating: number;
  jobsCompleted: string;
}

export const MonthlySummaryCard: React.FC<MonthlySummaryCardProps> = ({
  hiredCount,
  jobsCount,
  avgRating,
  jobsCompleted,
}) => {
  return (
    <div
      className="card border-0 p-4 rounded-4 text-white"
      style={{ backgroundColor: '#0f172a' }}
    >
      <span
        className="text-uppercase extra-small fw-bold mb-3 d-block"
        style={{ color: '#94a3b8', letterSpacing: '0.05em' }}
      >
        THIS MONTH
      </span>

      <div className="display-5 fw-extrabold mb-1">{hiredCount} hired</div>
      <p className="small mb-4" style={{ color: '#94a3b8' }}>
        Across {jobsCount} different jobs
      </p>

      <div className="d-flex justify-content-between pt-3 border-top border-secondary">
        <div>
          <span className="extra-small d-block mb-1" style={{ color: '#94a3b8' }}>
            Avg. rating given
          </span>
          <span className="fw-bold fs-6">{avgRating} ★</span>
        </div>
        <div>
          <span className="extra-small d-block mb-1" style={{ color: '#94a3b8' }}>
            Jobs completed
          </span>
          <span className="fw-bold fs-6">{jobsCompleted}</span>
        </div>
      </div>
    </div>
  );
};