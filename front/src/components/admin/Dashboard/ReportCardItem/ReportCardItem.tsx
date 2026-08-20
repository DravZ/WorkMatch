import React from 'react';
import { StatusBadge, type StatusType } from '../StatudBadge/StatusBadge';

export interface ReportData {
  id: string;
  title: string;
  icon: 'job' | 'user';
  typeText: string;
  reporter: string;
  date: string;
  status: StatusType;
}

interface ReportCardItemProps {
  report: ReportData;
  onReview?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export const ReportCardItem: React.FC<ReportCardItemProps> = ({
  report,
  onReview,
  onDismiss,
}) => {
  const isReviewing = report.status === 'reviewing';

  return (
    <div
      className="p-3 rounded-3 bg-light border-start border-4 d-flex justify-content-between align-items-start"
      style={{
        borderColor: isReviewing ? '#d97706' : '#0b9982',
      }}
    >
      <div className="flex-grow-1 me-2">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h3 className="fw-bold text-dark mb-0" style={{ fontSize: '0.825rem' }}>
            {report.title}
          </h3>
          <StatusBadge status={report.status} />
        </div>

        <p className="text-muted mb-2" style={{ fontSize: '0.725rem' }}>
          {report.icon === 'job' ? '📋' : '👤'} {report.typeText} · Reported by {report.reporter} · {report.date}
        </p>

        {report.status !== 'Resolved' && (
          <div className="d-flex gap-2 align-items-center">
            <button
              type="button"
              onClick={() => onReview?.(report.id)}
              className="btn btn-dark text-white fw-semibold rounded-2 px-3 py-1 border-0"
              style={{ fontSize: '0.725rem', backgroundColor: '#0f172a' }}
            >
              Review
            </button>
            <button
              type="button"
              onClick={() => onDismiss?.(report.id)}
              className="btn btn-link text-muted text-decoration-none fw-semibold p-0 border-0"
              style={{ fontSize: '0.725rem' }}
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
};