import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import styles from './WorkerNavbar.module.css';

import { useLogoutController } from '../../../controllers/auth.controller';
import { useUser } from '../../../context/UserContext/UserContext';

interface WorkerNavbarProps {
  activePath?: string;
  notificationCount?: number;
}

export const WorkerNavbar: React.FC<WorkerNavbarProps> = ({
  activePath = '/worker/',
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
        .trim()
        .split(/\s+/)
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  const navLinks = [
    { label: 'Find Jobs', path: '/worker/find-jobs' },
    { label: 'Applications', path: '/worker/applications' },
    { label: 'Messages', path: '/worker/messages' },
    { label: 'Saved', path: '/worker/saved' },
  ];

  const mobileNavLinks = [
    { label: 'Find Jobs', path: '/worker/find-jobs' },
    { label: 'Applications', path: '/worker/applications' },
    { label: 'Messages', path: '/worker/messages' },
    { label: 'Saved', path: '/worker/saved' },
    { label: 'My Profile', path: '/worker/profile' },
    { label: 'Notifications', path: '/worker/notifications' },
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
              to="/worker/"
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

            {/* Botón de Notificación */}
            <Link
              to="/worker/notifications"
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

            {/* Avatar de Usuario */}
            <Link
              to="/worker/profile"
              className={`d-flex align-items-center justify-content-center fw-bold rounded-circle text-decoration-none ${styles.avatarCircle}`}
              title="My Profile"
            >
              {userInitials}
            </Link>

            {/* Log Out Desktop */}
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

            {/* Botón Notificación Móvil */}
            <Link
              to="/worker/notifications"
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

            {/* Avatar Móvil */}
            <Link
              to="/worker/profile"
              className={`d-flex align-items-center justify-content-center fw-bold rounded-circle text-decoration-none ${styles.avatarCircle}`}
            >
              {userInitials}
            </Link>

            {/* Botón Hamburguesa */}
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

        {/* Menú Desplegable Móvil */}
        {isOpen && (
          <div
            className={`d-lg-none py-4 border-top ${styles.mobileMenu}`}
          >
            <div className="d-flex flex-column gap-3 mb-4 ps-2">
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

            {/* CTA Móvil Log out */}
            <div className="px-2">
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