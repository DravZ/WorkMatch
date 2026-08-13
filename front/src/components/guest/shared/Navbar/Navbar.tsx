import React, { useState } from 'react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`border-bottom bg-white sticky-top ${styles.navbarHeader}`}>
      <div className="container">
        <nav className="d-flex align-items-center justify-content-between py-3">
          
          {/* Logo Brand */}
          <a href="#" className="d-flex align-items-center gap-2 text-decoration-none">
            <span className={`d-inline-flex align-items-center justify-content-center fw-bold rounded-3 ${styles.logoIcon}`}>
              W
            </span>
            <span className="fw-extrabold text-dark fs-5">WorkMatch</span>
          </a>

          {/* Menú Desktop (Se oculta en móvil d-none d-lg-flex) */}
          <div className="d-none d-lg-flex align-items-center gap-4">
            <a href="#find-work" className={styles.navLink}>Find Work</a>
            <a href="#hire-workers" className={styles.navLink}>Hire Workers</a>
            <a href="#how-it-works" className={styles.navLink}>How it Works</a>
          </div>

          {/* CTAs Desktop (Se oculta en móvil d-none d-lg-flex) */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            <a href="#login" className={styles.navLink}>Log in</a>
            <button className={`btn fw-semibold px-4 py-2 ${styles.btnPrimary}`}>
              Sign up free
            </button>
          </div>

          {/* Botones Móvil (Se ven solo en pantallas chicas d-flex d-lg-none) */}
          <div className="d-flex d-lg-none align-items-center gap-2">
            <button className={`btn btn-sm fw-semibold px-3 py-2 ${styles.btnPrimary}`}>
              Sign up
            </button>
            <button 
              onClick={toggleMenu} 
              className={`btn border p-2 d-flex align-items-center justify-content-center ${styles.toggleBtn}`}
              aria-label="Toggle Navigation"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>

        </nav>

        {/* Menú Desplegable Móvil */}
        {isOpen && (
          <div className={`d-lg-none py-4 border-top ${styles.mobileMenu}`}>
            <div className="d-flex flex-column gap-3 mb-4 ps-2">
              <a href="#find-work" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
                Find Work
              </a>
              <a href="#hire-workers" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
                Hire Workers
              </a>
              <a href="#how-it-works" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
                How it Works
              </a>
            </div>

            <hr className="my-4 text-muted opacity-25" />

            {/* CTAs Móvil Abierto */}
            <div className="row g-3">
              <div className="col-6">
                <button className={`btn w-100 py-2 fw-semibold ${styles.btnOutline}`}>
                  Log in
                </button>
              </div>
              <div className="col-6">
                <button className={`btn w-100 py-2 fw-semibold ${styles.btnPrimary}`}>
                  Sign up free
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};