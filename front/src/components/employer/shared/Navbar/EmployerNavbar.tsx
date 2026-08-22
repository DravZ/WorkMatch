import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './EmployerNavbar.module.css';

import { useUser } from '../../../../context/UserContext/UserContext'; 
import { useLogoutController } from '../../../../controllers/auth.controller'; 

interface EmployerNavbarProps {
  activePath?: string;
  notificationCount?: number;
}

export const EmployerNavbar: React.FC<EmployerNavbarProps> = ({
  activePath = '/employer/',
  notificationCount = 2,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();
  const { logout } = useLogoutController();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const userInitials = user?.nombreCompleto
    ? user.nombreCompleto
        .split(' ')
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  const navLinks = [
    { label: 'Post a Job', path: '/employer/post-job' },
    { label: 'Applications', path: '/employer/applications' },
    { label: 'Find Workers', path: '/employer/find-workers' },
    { label: 'Messages', path: '/employer/messages' },
  ];

  const mobileNavLinks = [
    { label: 'Post a Job', path: '/employer/post-job' },
    { label: 'Applications', path: '/employer/applications' },
    { label: 'Find Workers', path: '/employer/find-workers' },
    { label: 'Messages', path: '/employer/messages' },
    { label: 'Notifications', path: '/employer/notifications' },
    { label: 'Profile', path: '/employer/company-profile' },
  ];

  return (
    <header
      className={`border-bottom bg-white sticky-top ${styles.navbarHeader}`}
    >
      <div className="container">
        <nav className="d-flex align-items-center justify-content-between py-3">

          {/* Logo Brand & Nav Desktop */}
          <div className="d-flex align-items-center gap-4">
            <Link
              to="/employer"
              onClick={closeMenu}
              className="d-flex align-items-center gap-2 text-decoration-none"
            >
              <span
                className={`d-inline-flex align-items-center justify-content-center fw-bold rounded-3 ${styles.logoIcon}`}
              >
                W
              </span>

              <span className="fw-extrabold text-dark fs-5">
                WorkMatch
              </span>
            </Link>

            {/* Menú Desktop */}
            <div className="d-none d-lg-flex align-items-center gap-4">
              {navLinks.map((link) => {
                const isActive = activePath === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`${styles.navLink} ${
                      isActive ? styles.activeNavLink : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Acciones de Usuario Desktop */}
          <div className="d-none d-lg-flex align-items-center gap-3">

            {/* Notificaciones */}
            <Link
              to="/employer/notifications"
              className={`position-relative d-flex align-items-center justify-content-center ${styles.iconBtn}`}
              aria-label="Notifications"
            >
              <span className={styles.bellEmoji}>🔔</span>

              {notificationCount > 0 && (
                <span
                  className={`position-absolute top-0 start-100 translate-middle badge rounded-circle ${styles.notifBadge}`}
                >
                  {notificationCount}
                </span>
              )}
            </Link>

            {/* Avatar */}
            <Link
              to="/employer/company-profile"
              className={`d-flex align-items-center justify-content-center fw-bold rounded-circle text-decoration-none ${styles.avatarCircle}`}
              title="Company Profile"
            >
              {userInitials}
            </Link>

            {/* Logout */}
            <button
              type="button"
              onClick={logout}
              className={`btn p-0 border-0 ${styles.navLink}`}
            >
              Log out
            </button>
          </div>

          {/* Botones y Menú Móvil */}
          <div className="d-flex d-lg-none align-items-center gap-2">

            {/* Notificaciones */}
            <Link
              to="/employer/notifications"
              className={`position-relative d-flex align-items-center justify-content-center ${styles.iconBtn}`}
              aria-label="Notifications"
            >
              <span className={styles.bellEmoji}>🔔</span>

              {notificationCount > 0 && (
                <span
                  className={`position-absolute top-0 start-100 translate-middle badge rounded-circle ${styles.notifBadge}`}
                >
                  {notificationCount}
                </span>
              )}
            </Link>

            {/* Avatar */}
            <Link
              to="/employer/company-profile"
              className={`d-flex align-items-center justify-content-center fw-bold rounded-circle text-decoration-none ${styles.avatarCircle}`}
            >
              {userInitials}
            </Link>

            {/* Hamburguesa */}
            <button
              type="button"
              onClick={toggleMenu}
              className={`btn border p-2 d-flex align-items-center justify-content-center ${styles.toggleBtn}`}
              aria-label="Toggle Navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>

        {/* Menú Móvil */}
        {isOpen && (
          <div
            className={`d-lg-none py-4 border-top ${styles.mobileMenu}`}
          >
            <div className="d-flex flex-column gap-2 mb-4">
              {mobileNavLinks.map((link) => {
                const isActive = activePath === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`${styles.mobileNavLink} ${
                      isActive ? styles.mobileActiveNavLink : ''
                    }`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <hr className="my-4 text-muted opacity-25" />

            {/* Logout móvil */}
            <div className="px-1">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                className={`btn w-100 py-2 fw-semibold ${styles.btnLogoutMobile}`}
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};