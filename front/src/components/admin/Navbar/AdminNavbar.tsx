import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminNavbar.module.css';

export const AdminNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`border-bottom bg-white sticky-top ${styles.navbarHeader}`}>
      <div className="container">
        <nav className="d-flex align-items-center justify-content-between py-3">

          {/* Logo Brand */}
          <Link
            to="admin/"
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
            
          </div>

          {/* CTAs Desktop */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            <div
              className={styles.navLink}
            >
              Log out
            </div>
          </div>

          {/* CTAs Movil */}
          <div className="d-flex d-lg-none align-items-center gap-3">
            <div
              className={styles.navLink}
            >
              Log out
            </div>
          </div>

          
        </nav>

        
      </div>
    </header>
  );
};