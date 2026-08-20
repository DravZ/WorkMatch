import React from 'react';

interface HistoryItem {
  id: string;
  title: string;
  company: string;
  date: string;
  pay: string;
  rating: number;
}

interface ProfileHistoryProps {
  historyItems: HistoryItem[];
}

export const ProfileHistory: React.FC<ProfileHistoryProps> = ({ historyItems }) => {
  return (
    <div className="card border-0 shadow-sm p-4 rounded-4">
      <h2 className="h6 fw-bold text-dark mb-3">Job history</h2>
      <div className="d-flex flex-column gap-3">
        {historyItems.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center"
          >
            <div>
              <h3 className="fw-bold text-dark small mb-0">{item.title}</h3>
              <span className="text-muted extra-small">
                {item.company} • {item.date}
              </span>
            </div>

            <div className="text-end">
              <span className="fw-bold text-teal small d-block">{item.pay}</span>
              <span className="text-warning extra-small">★★★★★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};