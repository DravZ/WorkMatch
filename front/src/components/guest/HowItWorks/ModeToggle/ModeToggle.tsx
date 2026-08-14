import React from 'react';
import styles from './ModeToggle.module.css';

export type ActiveMode = 'work' | 'hire';

interface ModeToggleProps {
  activeMode: ActiveMode;
  onModeChange: (mode: ActiveMode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ activeMode, onModeChange }) => {
  return (
    <div className={`d-inline-flex p-1 ${styles.toggleContainer}`}>
      <button
        type="button"
        onClick={() => onModeChange('work')}
        className={`btn fw-semibold px-4 py-2 ${styles.toggleBtn} ${
          activeMode === 'work' ? styles.active : ''
        }`}
      >
        🧑‍🌾 I Want To Work
      </button>

      <button
        type="button"
        onClick={() => onModeChange('hire')}
        className={`btn fw-semibold px-4 py-2 ${styles.toggleBtn} ${
          activeMode === 'hire' ? styles.active : ''
        }`}
      >
        🏢 I Want To Hire
      </button>
    </div>
  );
};