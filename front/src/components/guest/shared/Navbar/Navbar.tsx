import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`border-bottom bg-white sticky-top ${styles.navbarHeader}`}
    >
      <div className="container">
        <nav className="d-flex align-items-center justify-content-between py-3">

          {/* Logo Brand */}
          <Link
            to="/"
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
            <Link
              to="/find-work"
              className={styles.navLink}
            >
              Find Work
            </Link>

            <Link
              to="/hire-workers"
              className={styles.navLink}
            >
              Hire Workers
            </Link>

            <Link
              to="/how-it-works"
              className={styles.navLink}
            >
              How it Works
            </Link>
          </div>

          {/* CTAs Desktop */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            <Link
              to="/login"
              className={styles.navLink}
            >
              Log in
            </Link>

            <Link
              to="/register"
              className={`btn fw-semibold px-4 py-2 ${styles.btnPrimary}`}
            >
              Sign up free
            </Link>
          </div>

          {/* Botones Móvil */}
          <div className="d-flex d-lg-none align-items-center gap-2">
            <Link
              to="/register"
              className={`btn btn-sm fw-semibold px-3 py-2 ${styles.btnPrimary}`}
            >
              Sign up
            </Link>

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

              <Link
                to="/find-work"
                className={styles.mobileNavLink}
                onClick={closeMenu}
              >
                Find Work
              </Link>

              <Link
                to="/hire-workers"
                className={styles.mobileNavLink}
                onClick={closeMenu}
              >
                Hire Workers
              </Link>

              <Link
                to="/how-it-works"
                className={styles.mobileNavLink}
                onClick={closeMenu}
              >
                How it Works
              </Link>
            </div>

            <hr className="my-4 text-muted opacity-25" />

            {/* CTAs Móvil */}
            <div className="row g-3">
              <div className="col-6">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={`btn w-100 py-2 fw-semibold ${styles.btnOutline}`}
                >
                  Log in
                </Link>
              </div>

              <div className="col-6">
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className={`btn w-100 py-2 fw-semibold ${styles.btnPrimary}`}
                >
                  Sign up free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};