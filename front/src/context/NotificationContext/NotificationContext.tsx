import React, { createContext, useContext, useState } from 'react';

type NotificationType = 'success' | 'error' | 'alert';

interface Notification {
  type: NotificationType;
  title: string;
  description: string;
}

interface NotificationContextType {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        closeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification debe utilizarse dentro de un NotificationProvider'
    );
  }

  return context;
};