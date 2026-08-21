import React from 'react';
import styles from './NotificationTabs.module.css';

export type FilterType = 'all' | 'unread';

interface NotificationTabsProps {
  activeTab: FilterType;
  unreadCount: number;
  onTabChange: (tab: FilterType) => void;
}

export const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeTab,
  unreadCount,
  onTabChange,
}) => {
  return (
    <div className={`d-inline-flex p-1 bg-white border ${styles.tabsContainer}`}>
      <button
        type="button"
        onClick={() => onTabChange('all')}
        className={`btn btn-sm ${styles.tabBtn} ${
          activeTab === 'all' ? styles.activeTab : ''
        }`}
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onTabChange('unread')}
        className={`btn btn-sm ${styles.tabBtn} ${
          activeTab === 'unread' ? styles.activeTab : ''
        }`}
      >
        Unread ({unreadCount})
      </button>
    </div>
  );
};