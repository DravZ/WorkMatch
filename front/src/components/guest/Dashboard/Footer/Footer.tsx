import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-5 pt-5 pb-4 border-top">
      <div className="container">
        
        {/* Fila Superior: Logo y Enlaces de Navegación */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 pb-4">
          <div className="d-flex align-items-center gap-2">
            <span className={`d-inline-flex align-items-center justify-content-center fw-bold rounded-2 ${styles.logoIcon}`}>
              W
            </span>
            <span className="fw-bold text-dark fs-5">WorkMatch</span>
          </div>

          <div className="d-flex flex-wrap gap-4">
            <a href="#about" className={styles.footerLink}>About</a>
            <a href="#privacy" className={styles.footerLink}>Privacy</a>
            <a href="#terms" className={styles.footerLink}>Terms</a>
            <a href="#support" className={styles.footerLink}>Support</a>
            <a href="#blog" className={styles.footerLink}>Blog</a>
          </div>
        </div>

        {/* Fila Inferior: Copyright y Slogan */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center pt-3 text-muted small border-top border-light">
          <p className="mb-2 mb-sm-0">
            © {new Date().getFullYear()} WorkMatch, Inc. All rights reserved.
          </p>
          <p className="mb-0">Built for real workers, real employers.</p>
        </div>

      </div>
    </footer>
  );
};