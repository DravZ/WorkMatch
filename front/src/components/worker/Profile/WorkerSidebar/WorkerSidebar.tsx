import React from 'react';
import styles from './WorkerSidebar.module.css';

interface WorkerSidebarProps {
  name: string;
  isVerified?: boolean;
  roleTitle: string;
  rating: number;
  reviewsCount: number;
  jobsDone: number;
  hourlyRate: string;
  completionRate: string;
  location: string;
  availability: string;
  responseTime: string;
  categories: string[];
  profileStrength: number;
}

export const WorkerSidebar: React.FC<WorkerSidebarProps> = ({
  name,
  isVerified = true,
  roleTitle,
  rating,
  reviewsCount,
  jobsDone,
  hourlyRate,
  completionRate,
  location,
  availability,
  responseTime,
  categories,
  profileStrength,
}) => {
  return (
    <div className="d-flex flex-column gap-3">
      {/* Targeta Principal de Usuario */}
      <div className="card border-0 shadow-sm p-4 text-center rounded-4">
        <div className="position-relative mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
          <div className={styles.avatar}>MT</div>
          <button type="button" className={styles.avatarAddBtn} title="Upload photo">
            +
          </button>
        </div>

        <h2 className="h5 fw-bold text-dark mb-1 d-flex align-items-center justify-content-center gap-1">
          {name} {isVerified && <span className={styles.verifiedBadge}>✓</span>}
        </h2>
        <p className="text-muted extra-small mb-2">{roleTitle}</p>

        <div className="d-flex align-items-center justify-content-center gap-1 text-warning extra-small fw-semibold mb-3">
          ★ {rating} <span className="text-muted fw-normal">({reviewsCount} reviews)</span>
        </div>

        {/* Métricas destacadas */}
        <div className="d-flex justify-content-around bg-light p-3 rounded-3 mb-3">
          <div>
            <div className="h5 fw-bold text-teal mb-0">{jobsDone}</div>
            <span className="text-muted extra-small">Jobs done</span>
          </div>
          <div className="border-end"></div>
          <div>
            <div className="h5 fw-bold text-dark mb-0">{hourlyRate}</div>
            <span className="text-muted extra-small">Per hour</span>
          </div>
          <div className="border-end"></div>
          <div>
            <div className="h5 fw-bold text-dark mb-0">{completionRate}</div>
            <span className="text-muted extra-small">Completion</span>
          </div>
        </div>

        <button type="button" className={`btn w-100 ${styles.btnEdit}`}>
          Edit profile
        </button>
      </div>

      {/* Detalle Informativo */}
      <div className="card border-0 shadow-sm p-3 rounded-4">
        <div className="d-flex flex-column gap-3 extra-small">
          <div>
            <span className="text-muted uppercase fw-semibold d-block mb-1">📍 LOCATION</span>
            <span className="fw-semibold text-dark">{location}</span>
          </div>
          <div className="border-bottom"></div>
          <div>
            <span className="text-muted uppercase fw-semibold d-block mb-1">💵 RATE</span>
            <span className="fw-semibold text-dark">{hourlyRate}/hr</span>
          </div>
          <div className="border-bottom"></div>
          <div>
            <span className="text-muted uppercase fw-semibold d-block mb-1">☑ AVAILABILITY</span>
            <span className="fw-semibold text-dark">{availability}</span>
          </div>
          <div className="border-bottom"></div>
          <div>
            <span className="text-muted uppercase fw-semibold d-block mb-1">⚡ RESPONSE</span>
            <span className="fw-semibold text-dark">{responseTime}</span>
          </div>
        </div>
      </div>

      {/* Áreas de Trabajo */}
      <div className="card border-0 shadow-sm p-3 rounded-4">
        <span className="text-muted uppercase extra-small fw-semibold d-block mb-2">WORKS IN</span>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <span key={idx} className={styles.categoryTag}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Fuerza del Perfil */}
      <div className="card border-0 shadow-sm p-3 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-bold small text-dark">Profile strength</span>
          <span className="fw-bold text-teal small">{profileStrength}%</span>
        </div>
        <div className="progress mb-3" style={{ height: '6px' }}>
          <div
            className="progress-bar bg-teal"
            style={{ width: `${profileStrength}%`, backgroundColor: '#0b9982' }}
          ></div>
        </div>

        <ul className="list-unstyled extra-small mb-0 d-flex flex-column gap-2 text-muted">
          <li className="d-flex justify-content-between align-items-center">
            <span>⚪ Profile photo</span>
            <button className="btn btn-link text-teal extra-small p-0 fw-bold text-decoration-none">
              Add
            </button>
          </li>
          <li className="text-teal fw-medium">✓ Bio</li>
          <li className="text-teal fw-medium">✓ Skills</li>
          <li className="text-teal fw-medium">✓ Work experience</li>
          <li className="text-teal fw-medium">✓ Identity verified</li>
          <li className="text-teal fw-medium">✓ Availability set</li>
        </ul>
      </div>
    </div>
  );
};