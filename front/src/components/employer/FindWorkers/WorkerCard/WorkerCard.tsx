import React, { useState } from 'react';
import { AvatarApp } from '../../Applications/AvatarApp/AvatarApp';

export interface Worker {
  id: string;
  initials: string;
  avatarBg?: string;
  name: string;
  title: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  isVerified: boolean;
  location: string;
  availability: 'Available now' | 'Flexible' | string;
  skills: string[];
  extraSkillsCount?: number;
  category: string;
}

interface WorkerCardProps {
  worker: Worker;
  onInvite?: (workerId: string) => void;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onInvite }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 d-flex flex-column justify-content-between">
      <div>
        {/* Encabezado: Avatar, Nombre, Tarifa y Favorito */}
        <div className="d-flex align-items-start justify-content-between mb-2">
          <div className="d-flex align-items-center gap-3">
            <AvatarApp
              initials={worker.initials}
              bgColor={worker.avatarBg || '#0b9982'}
            />
            <div>
              <div className="d-flex align-items-center gap-1">
                <h3 className="h6 fw-bold text-dark mb-0">{worker.name}</h3>
                {worker.isVerified && (
                  <span
                    className="text-teal extra-small fw-bold ms-1"
                    title="Verified Worker"
                  >
                    ✓
                  </span>
                )}
              </div>
              <p className="text-muted extra-small mb-0 text-truncate" style={{ maxWidth: '170px' }}>
                {worker.title}
              </p>
            </div>
          </div>

          <div className="text-end">
            <div className="lh-1">
              <span className="h4 fw-bold text-teal mb-0">${worker.hourlyRate}</span>
            </div>
            <span className="text-muted" style={{ fontSize: '0.65rem' }}>
              / hour
            </span>
          </div>
        </div>

        {/* Rating, Jobs y Botón Favorito */}
        <div className="d-flex align-items-center justify-content-between my-3">
          <div className="d-flex align-items-center gap-1 extra-small">
            <span className="text-warning">★</span>
            <span className="fw-bold text-dark">{worker.rating}</span>
            <span className="text-muted">({worker.reviewCount})</span>
            <span className="text-muted ms-1">✓ {worker.jobsCompleted} jobs</span>
          </div>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="btn btn-sm border-0 p-0 text-muted rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '28px', height: '28px', backgroundColor: '#f8fafc' }}
          >
            {isFavorite ? '❤️' : '♡'}
          </button>
        </div>

        {/* Ubicación y Disponibilidad */}
        <div className="d-flex align-items-center gap-3 extra-small text-muted mb-3">
          <div className="d-flex align-items-center gap-1">
            <span style={{ color: '#e11d48' }}>📍</span>
            <span>{worker.location}</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <span style={{ color: '#d97706' }}>⚡</span>
            <span>{worker.availability}</span>
          </div>
        </div>

        {/* Badges de Skills */}
        <div className="d-flex flex-wrap gap-1 mb-4">
          {worker.skills.map((skill, index) => (
            <span
              key={index}
              className="badge fw-normal text-secondary bg-light border-0 rounded-pill px-2.5 py-1.5"
              style={{ fontSize: '0.7rem' }}
            >
              {skill}
            </span>
          ))}
          {worker.extraSkillsCount && (
            <span
              className="badge fw-normal text-muted bg-light border-0 rounded-pill px-2 py-1.5"
              style={{ fontSize: '0.7rem' }}
            >
              +{worker.extraSkillsCount}
            </span>
          )}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="row g-2 pt-2">
        <div className="col-6">
          <a
            href={`/employer/workers/${worker.id}`}
            className="btn btn-outline-secondary w-100 py-2 fw-semibold rounded-3 extra-small bg-white text-dark border-light-subtle text-decoration-none text-center d-block"
          >
            View profile
          </a>
        </div>
        <div className="col-6">
          <button
            onClick={() => onInvite && onInvite(worker.id)}
            className="btn text-white w-100 py-2 fw-semibold rounded-3 extra-small"
            style={{ backgroundColor: '#0b9982' }}
          >
            Invite to job
          </button>
        </div>
      </div>
    </div>
  );
};