import React from 'react';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import styles from './NotificationModal.module.css';
import { useNotification } from '../../../context/NotificationContext/NotificationContext';

export const NotificationModal: React.FC = () => {
  const { notification, closeNotification } = useNotification();

  if (!notification) return null;

  const renderIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle2 size={32} />;
      case 'error':
        return <XCircle size={32} />;
      case 'alert':
        return <AlertCircle size={32} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.overlay} onClick={closeNotification}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.iconWrapper} ${styles[notification.type]}`}>
          {renderIcon()}
        </div>

        <h2 className={styles.title}>{notification.title}</h2>
        <p className={styles.description}>{notification.description}</p>

        <button
          type="button"
          className={styles.button}
          onClick={closeNotification}
        >
          Entendido
        </button>
      </div>
    </div>
  );
};