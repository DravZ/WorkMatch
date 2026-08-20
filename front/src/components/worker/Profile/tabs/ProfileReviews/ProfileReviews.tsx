import React from 'react';

interface Review {
  id: string;
  reviewer: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
}

interface ProfileReviewsProps {
  overallRating: number;
  totalReviews: number;
  ratingsDistribution: { stars: number; count: number; percentage: number }[];
  reviews: Review[];
}

export const ProfileReviews: React.FC<ProfileReviewsProps> = ({
  overallRating,
  totalReviews,
  ratingsDistribution,
  reviews,
}) => {
  return (
    <div className="d-flex flex-column gap-3">
      {/* Resumen de Estrellas */}
      <div className="card border-0 shadow-sm p-4 rounded-4">
        <div className="row align-items-center">
          <div className="col-12 col-sm-3 text-center mb-3 mb-sm-0 border-end-sm">
            <div className="display-4 fw-extrabold text-dark mb-1">{overallRating}</div>
            <div className="text-warning small mb-1">★★★★★</div>
            <span className="text-muted extra-small">{totalReviews} reviews</span>
          </div>

          <div className="col-12 col-sm-9 ps-sm-4">
            <div className="d-flex flex-column gap-1">
              {ratingsDistribution.map((item) => (
                <div key={item.stars} className="d-flex align-items-center gap-2 extra-small">
                  <span className="text-muted" style={{ width: '12px' }}>
                    {item.stars}
                  </span>
                  <div className="progress flex-grow-1" style={{ height: '6px' }}>
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reseñas Individuales */}
      {reviews.map((rev) => (
        <div key={rev.id} className="card border-0 shadow-sm p-4 rounded-4">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h3 className="h6 fw-bold text-dark mb-0">{rev.reviewer}</h3>
              <span className="text-muted extra-small">for: {rev.role}</span>
            </div>
            <div className="text-end">
              <div className="text-warning extra-small">★★★★★</div>
              <span className="text-muted extra-small">{rev.date}</span>
            </div>
          </div>
          <p className="text-muted small mb-0 italic">"{rev.comment}"</p>
        </div>
      ))}
    </div>
  );
};