import React from 'react';
import styles from './CategoryCard.module.css';

export interface CategoryCardProps {
  icon: string | React.ReactNode;
  title: string;
  openCount: number;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  openCount,
  onClick,
}) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className={`card border-0 p-3 h-100 ${styles.categoryCard}`}
    >
      <div className="card-body p-1 d-flex flex-column justify-content-between">
        <div className={`mb-3 ${styles.iconWrapper}`}>
          {typeof icon === 'string' ? <span className={styles.emojiIcon}>{icon}</span> : icon}
        </div>
        <div>
          <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '0.95rem' }}>
            {title}
          </h6>
          <span className="text-muted small">{openCount} open</span>
        </div>
      </div>
    </div>
  );
};