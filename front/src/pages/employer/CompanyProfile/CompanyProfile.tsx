import React, { useState } from 'react';

interface ActiveJob {
  id: string;
  title: string;
  location: string;
  schedule: string;
  rate: string;
  spotsLeft: number;
  isUrgent?: boolean;
}

interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
}

export const CompanyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'reviews'>('jobs');

  // Datos de trabajos activos según el diseño
  const activeJobs: ActiveJob[] = [
    {
      id: '1',
      title: 'Warehouse Picker & Packer',
      location: 'Brooklyn, NY',
      schedule: 'Mon–Fri, 7am–3pm',
      rate: '$22/hr',
      spotsLeft: 2,
    },
    {
      id: '2',
      title: 'Event Setup Crew',
      location: 'Manhattan, NY',
      schedule: 'Sat, 6am–2pm',
      rate: '$25/hr',
      spotsLeft: 3,
      isUrgent: true,
    },
    {
      id: '3',
      title: 'Office Deep Clean',
      location: 'Midtown, NY',
      schedule: 'Sun, 8am–12pm',
      rate: '$320',
      spotsLeft: 2,
    },
    {
      id: '4',
      title: 'Restaurant Kitchen Helper',
      location: 'West Village, NY',
      schedule: 'Fri–Sat, 4pm–12am',
      rate: '$18/hr',
      spotsLeft: 1,
    },
  ];

  // Datos de reseñas recibidas
  const reviews: Review[] = [
    {
      id: '1',
      author: 'Marcus T.',
      role: 'Warehouse Picker',
      rating: 5,
      date: '2026-07-28',
      comment:
        'Great employer. Clear instructions, on-site supervisor was helpful, and payment came through same day. Will work with them again.',
    },
  ];

  return (
    <div className="min-vh-100 bg-light py-5 px-3">
      <div className="container" style={{ maxWidth: '1040px' }}>
        <div className="row g-4">
          
          {/* COLUMNA IZQUIERDA: Perfil & Detalles */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-3">
            
            {/* Card Principal: Logo, Nombre, Métricas */}
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white">
              {/* Logo de la empresa */}
              <div
                className="mx-auto rounded-4 d-flex align-items-center justify-content-center text-white fw-bold mb-3"
                style={{ width: '80px', height: '80px', backgroundColor: '#0f172a', fontSize: '1.25rem' }}
              >
                ML
              </div>

              {/* Nombre y Verificación */}
              <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                <h1 className="h5 fw-bold text-dark mb-0">Metro Logistics Co.</h1>
                <span className="text-teal extra-small fw-bold" title="Verified Business">
                  ✓
                </span>
              </div>

              <p className="text-muted extra-small mb-1">Logistics & Warehousing</p>
              <p className="text-muted extra-small mb-4">📍 Brooklyn, NY</p>

              {/* Estadísticas / Métricas */}
              <div className="row g-0 py-2 border-top border-bottom border-light mb-4">
                <div className="col-4 border-end border-light">
                  <div className="h4 fw-bold text-teal mb-0">4.7</div>
                  <span className="text-muted" style={{ fontSize: '0.65rem' }}>
                    78 reviews
                  </span>
                </div>
                <div className="col-4 border-end border-light">
                  <div className="h4 fw-bold text-dark mb-0">82</div>
                  <span className="text-muted" style={{ fontSize: '0.65rem' }}>
                    jobs filled
                  </span>
                </div>
                <div className="col-4">
                  <div className="h4 fw-bold text-dark mb-0">89</div>
                  <span className="text-muted" style={{ fontSize: '0.65rem' }}>
                    jobs posted
                  </span>
                </div>
              </div>

              {/* Botón Editar Perfil */}
              <a
                href="/employer/settings"
                className="btn btn-outline-secondary w-100 py-2 fw-semibold rounded-3 extra-small bg-white text-dark border-light-subtle text-decoration-none"
              >
                Edit company profile
              </a>
            </div>

            {/* Card Secundarios: Metadatos */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex flex-column gap-3">
                {/* Member since */}
                <div className="d-flex align-items-start gap-3">
                  <span className="fs-6">📅</span>
                  <div>
                    <span className="text-muted fw-bold extra-small text-uppercase d-block mb-0.5">
                      MEMBER SINCE
                    </span>
                    <span className="fw-semibold text-dark extra-small">2023-03</span>
                  </div>
                </div>

                {/* Verification */}
                <div className="d-flex align-items-start gap-3">
                  <span className="fs-6 text-teal">✓</span>
                  <div>
                    <span className="text-muted fw-bold extra-small text-uppercase d-block mb-0.5">
                      VERIFICATION
                    </span>
                    <span className="fw-semibold text-dark extra-small">
                      Identity & business verified
                    </span>
                  </div>
                </div>

                {/* Completion rate */}
                <div className="d-flex align-items-start gap-3">
                  <span className="fs-6">📊</span>
                  <div>
                    <span className="text-muted fw-bold extra-small text-uppercase d-block mb-0.5">
                      COMPLETION RATE
                    </span>
                    <span className="fw-semibold text-dark extra-small">92%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón Publicar Nuevo Empleo */}
            <a
              href="/employer/post-job"
              className="btn text-white w-100 py-2.5 fw-semibold rounded-3 extra-small text-decoration-none text-center shadow-sm"
              style={{ backgroundColor: '#0b9982' }}
            >
              + Post a new job
            </a>
          </div>

          {/* COLUMNA DERECHA: About + Tab Panel (Active Jobs / Reviews) */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-4">
            
            {/* Card: About */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <h2 className="h6 fw-bold text-dark mb-3">About</h2>
              <p className="text-secondary extra-small mb-0 lh-base">
                Metro Logistics is a regional fulfillment and distribution company serving the
                greater NYC metro area since 2008. We work with a network of trusted
                on-demand workers to handle seasonal peaks, special events, and overflow
                capacity.
              </p>
            </div>

            {/* Pestañas (Tabs Container) */}
            <div className="bg-white rounded-3 p-1 shadow-sm d-flex">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`btn flex-fill py-2 extra-small fw-bold rounded-3 transition-all border-0 ${
                  activeTab === 'jobs'
                    ? 'text-white'
                    : 'text-muted bg-transparent'
                }`}
                style={{
                  backgroundColor: activeTab === 'jobs' ? '#0f172a' : 'transparent',
                }}
              >
                Active Jobs
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`btn flex-fill py-2 extra-small fw-bold rounded-3 transition-all border-0 ${
                  activeTab === 'reviews'
                    ? 'text-white'
                    : 'text-muted bg-transparent'
                }`}
                style={{
                  backgroundColor: activeTab === 'reviews' ? '#0f172a' : 'transparent',
                }}
              >
                Reviews
              </button>
            </div>

            {/* CONTENIDO TAB 1: ACTIVE JOBS */}
            {activeTab === 'jobs' && (
              <div className="d-flex flex-column gap-3">
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="card border-0 shadow-sm rounded-4 p-4 bg-white d-flex flex-row align-items-center justify-content-between"
                  >
                    <div>
                      <h3 className="h6 fw-bold text-dark mb-1">{job.title}</h3>
                      <p className="text-muted extra-small mb-0">
                        📍 {job.location} · 📅 {job.schedule}
                      </p>
                    </div>

                    <div className="text-end">
                      <div className="d-flex align-items-center gap-2 justify-content-end mb-1">
                        <span className="h6 fw-bold text-dark mb-0">{job.rate}</span>
                        {job.isUrgent && (
                          <span
                            className="badge fw-medium px-2 py-1 rounded-pill extra-small"
                            style={{
                              backgroundColor: '#e6f7f4',
                              color: '#0b9982',
                              fontSize: '0.65rem',
                            }}
                          >
                            Urgent
                          </span>
                        )}
                      </div>
                      <span className="text-muted extra-small d-block">
                        {job.spotsLeft} {job.spotsLeft === 1 ? 'spot left' : 'spots left'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CONTENIDO TAB 2: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="d-flex flex-column gap-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div>
                        <h3 className="h6 fw-bold text-dark mb-0">{rev.author}</h3>
                        <span className="text-muted extra-small">for: {rev.role}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-teal extra-small">
                          {'★'.repeat(rev.rating)}
                        </span>
                        <span className="text-muted extra-small">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-secondary extra-small mb-0 fst-italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};