import React from 'react';
import styles from './ProfileTabsNav.module.css';

export type TabType = 'overview' | 'reviews' | 'history';

interface ProfileTabsNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const ProfileTabsNav: React.FC<ProfileTabsNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={`card border-0 shadow-sm p-1 mb-4 ${styles.tabsNav}`}>
      <div className="d-flex text-center">
        <button
          type="button"
          onClick={() => onTabChange('overview')}
          className={`btn flex-grow-1 ${styles.tabBtn} ${
            activeTab === 'overview' ? styles.activeTab : ''
          }`}
        >
          Overview
        </button>

        <button
          type="button"
          onClick={() => onTabChange('reviews')}
          className={`btn flex-grow-1 ${styles.tabBtn} ${
            activeTab === 'reviews' ? styles.activeTab : ''
          }`}
        >
          Reviews
        </button>

        <button
          type="button"
          onClick={() => onTabChange('history')}
          className={`btn flex-grow-1 ${styles.tabBtn} ${
            activeTab === 'history' ? styles.activeTab : ''
          }`}
        >
          History
        </button>
      </div>
    </div>
  );
};