import React from 'react';
import styles from './EmployerStatCard.module.css';

interface EmployerStatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  isHighlight?: boolean;
}

export const EmployerStatCard: React.FC<EmployerStatCardProps> = ({
  title,
  value,
  subtitle,
  isHighlight = false,
}) => {
  return (
    <div
      className={`card border-0 shadow-sm p-3 rounded-4 h-100 ${
        isHighlight ? styles.highlightCard : ''
      }`}
    >
      <span className={styles.statTitle}>{title}</span>
      <div className={`h2 fw-bold mb-1 ${isHighlight ? 'text-teal' : 'text-dark'}`}>
        {value}
      </div>
      <span className={styles.statSubtitle}>{subtitle}</span>
    </div>
  );
};