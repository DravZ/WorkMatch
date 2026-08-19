import React, { useState } from 'react';
import { NotificationItem, type Notification } from '../../../components/worker/Notifications/NotificationItem/NotificationItem';
import { NotificationTabs, type FilterType } from '../../../components/worker/Notifications/NotificationTabs/NotificationTabs';
import { EmptyState } from '../../../components/worker/Saved/EmptyState/EmptyState';

export const EmployerNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      icon: '📄',
      title: 'New application received',
      description: 'Marcus Thompson applied for Warehouse Picker & Packer.',
      category: 'Applications',
      timeAgo: '2 hours ago',
      isUnread: true,
    },
    {
      id: '2',
      icon: '💬',
      title: 'New message from Marcus Thompson',
      description: 'Is there a specific entrance I should use for Monday morning?',
      category: 'Messages',
      timeAgo: '4 hours ago',
      isUnread: true,
    },
    {
      id: '3',
      icon: '⭐',
      title: 'New worker review received',
      description: 'Marcus T. left a 5-star review: "Great employer. Clear instructions..."',
      category: 'Reviews',
      timeAgo: 'Yesterday',
      isUnread: false,
    },
    {
      id: '4',
      icon: '✅',
      title: 'Shift confirmed by worker',
      description: 'Aisha Johnson confirmed attendance for Event Setup Crew on Saturday.',
      category: 'Jobs',
      timeAgo: 'Yesterday',
      isUnread: false,
    },
    {
      id: '5',
      icon: '🛡️',
      title: 'Business verification complete',
      description: 'Your company profile and tax documentation have been successfully verified.',
      category: 'System',
      timeAgo: '3 days ago',
      isUnread: false,
    },
  ]);

  const [activeTab, setActiveTab] = useState<FilterType>('all');

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'unread') return n.isUnread;
    return true;
  });

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <main className="container max-w-4xl px-3 px-md-4 py-4 py-md-5 flex-grow-1" style={{ maxWidth: '800px' }}>
        
        {/* Header Principal */}
        <header className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="h3 fw-bold text-dark mb-1">Notifications</h1>
            <p className="text-muted small mb-0">{unreadCount} unread</p>
          </div>

          <button
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="btn btn-link text-decoration-none text-muted extra-small p-0 border-0 fw-semibold"
            style={{ fontSize: '0.825rem' }}
          >
            Mark all as read
          </button>
        </header>

        {/* Pestañas de Filtrado */}
        <div className="mb-4">
          <NotificationTabs
            activeTab={activeTab}
            unreadCount={unreadCount}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Lista de Notificaciones */}
        {filteredNotifications.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🔔"
            title="No notifications here"
            description={
              activeTab === 'unread'
                ? 'You have read all your notifications. Check back later for updates.'
                : 'You have no notifications at this time.'
            }
          />
        )}
      </main>
    </div>
  );
};