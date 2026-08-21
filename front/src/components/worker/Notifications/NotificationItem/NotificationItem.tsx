import React from 'react';
import styles from './NotificationItem.module.css';

export interface Notification {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: 'Applications' | 'Messages' | 'Reviews' | 'Jobs' | 'System';
  timeAgo: string;
  isUnread: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const { id, icon, title, description, category, timeAgo, isUnread } = notification;

  return (
    <div
      onClick={() => isUnread && onMarkAsRead?.(id)}
      className={`card border-0 p-3 p-md-4 mb-3 ${styles.notificationCard} ${
        isUnread ? styles.unreadCard : styles.readCard
      }`}
    >
      <div className="d-flex align-items-start gap-3">
        {/* Ícono de la notificación */}
        <div className={styles.iconContainer}>{icon}</div>

        {/* Contenido principal */}
        <div className="flex-grow-1 min-w-0">
          <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
            <h2 className="fw-bold text-dark fs-6 mb-0 text-truncate">{title}</h2>
            <div className="d-flex align-items-center gap-2 flex-shrink-0">
              <span className={styles.categoryBadge}>{category}</span>
              <span className="text-muted extra-small">{timeAgo}</span>
            </div>
          </div>

          <p className="text-muted small mb-2">{description}</p>

          {/* Badge Unread */}
          {isUnread && (
            <span className={styles.unreadTag}>
              <span className={styles.dot}></span> Unread
            </span>
          )}
        </div>
      </div>
    </div>
  );
};