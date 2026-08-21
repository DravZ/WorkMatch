import React, { useState } from 'react';

interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
}

interface HistoryItem {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  status: 'Completed' | 'In Progress';
}

export const WorkerProfile_Emp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'history'>('overview');

  // Datos mock del trabajador (Marcus Thompson)
  const workerData = {
    name: 'Marcus Thompson',
    initials: 'MT',
    avatarBg: '#0b9982',
    role: 'General Laborer & Warehouse Specialist',
    rating: 4.9,
    reviewCount: 47,
    jobsDone: 52,
    hourlyRate: '$22',
    completionRate: '98%',
    location: 'Brooklyn, NY',
    availability: 'Available now',
    responseTime: 'Usually within 1 hour',
    worksIn: ['Delivery', 'Moving', 'Construction'],
    about:
      'Reliable and hardworking with 6 years of warehouse, logistics, and general labor experience. I show up on time, follow instructions, and take pride in every job I complete. Available 7 days a week.',
    skills: [
      'Forklift certified',
      'Inventory management',
      'Heavy lifting',
      'Pallet jack',
      'OSHA trained',
    ],
    experience: [
      'Warehouse Associate — Amazon Fulfillment Center (2022–2024)',
      'Delivery Driver — FedEx Ground (2020–2022)',
      'Moving Crew Lead — Two Men and a Truck (2018–2020)',
    ],
  };

  const reviews: Review[] = [
    {
      id: '1',
      author: 'Metro Logistics Co.',
      role: 'Warehouse Picker & Packer',
      rating: 5,
      date: '2026-07-28',
      comment:
        'Marcus was exceptional. Arrived 15 minutes early, quickly understood the workflow, and exceeded our picking quota. Highly recommended!',
    },
    {
      id: '2',
      author: 'Prestige Events Group',
      role: 'Event Setup Crew',
      rating: 5,
      date: '2026-06-14',
      comment: 'Great team player and handles heavy lifting with ease. Will hire again.',
    },
  ];

  const history: HistoryItem[] = [
    {
      id: '1',
      jobTitle: 'Warehouse Picker & Packer',
      company: 'Metro Logistics Co.',
      date: 'Jul 2026',
      status: 'Completed',
    },
    {
      id: '2',
      jobTitle: 'Event Setup Crew',
      company: 'Prestige Events Group',
      date: 'Jun 2026',
      status: 'Completed',
    },
    {
      id: '3',
      jobTitle: 'Freight Loader',
      company: 'NYC Logistics Hub',
      date: 'May 2026',
      status: 'Completed',
    },
  ];

  return (
    <div className="min-vh-100 bg-light py-5 px-3">
      <div className="container" style={{ maxWidth: '1040px' }}>
        <div className="row g-4">
          
          {/* COLUMNA IZQUIERDA: Tarjeta de Perfil e Información Lateral */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-3">
            
            {/* Card Principal: Avatar, Nombre, Métricas y Acciones */}
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white">
              {/* Avatar con Iniciales */}
              <div
                className="mx-auto rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mb-3"
                style={{
                  width: '88px',
                  height: '88px',
                  backgroundColor: workerData.avatarBg,
                  fontSize: '1.75rem',
                }}
              >
                {workerData.initials}
              </div>

              {/* Nombre y Marca de Verificación */}
              <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                <h1 className="h5 fw-bold text-dark mb-0">{workerData.name}</h1>
                <span className="text-teal extra-small fw-bold" title="Verified Worker">
                  ✓
                </span>
              </div>

              <p className="text-muted extra-small mb-2">{workerData.role}</p>

              {/* Estrellas y Reseñas */}
              <div className="d-flex align-items-center justify-content-center gap-1 mb-4">
                <span className="text-warning extra-small">★★★★★</span>
                <span className="fw-bold text-dark extra-small ms-1">{workerData.rating}</span>
                <span className="text-muted extra-small">({workerData.reviewCount} reviews)</span>
              </div>

              {/* Métricas del Trabajador */}
              <div className="row g-0 py-2 border-top border-bottom border-light mb-4">
                <div className="col-4 border-end border-light">
                  <div className="h4 fw-bold text-teal mb-0">{workerData.jobsDone}</div>
                  <span className="text-muted" style={{ fontSize: '0.65rem' }}>
                    Jobs done
                  </span>
                </div>
                <div className="col-4 border-end border-light">
                  <div className="h4 fw-bold text-dark mb-0">{workerData.hourlyRate}</div>
                  <span className="text-muted" style={{ fontSize: '0.65rem' }}>
                    Per hour
                  </span>
                </div>
                <div className="col-4">
                  <div className="h4 fw-bold text-dark mb-0">{workerData.completionRate}</div>
                  <span className="text-muted" style={{ fontSize: '0.65rem' }}>
                    Completion
                  </span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn text-white flex-grow-1 py-2 fw-semibold rounded-3 extra-small shadow-sm"
                  style={{ backgroundColor: '#0b9982' }}
                >
                  Invite to job
                </button>
                <a
                  href="/employer/messages"
                  className="btn btn-outline-secondary flex-grow-1 py-2 fw-semibold rounded-3 extra-small bg-white text-dark border-light-subtle text-decoration-none"
                >
                  Message
                </a>
              </div>
            </div>

            {/* Card Secundario: Ubicación, Tarifa, Disponibilidad, Respuesta */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex flex-column gap-3">
                {/* Location */}
                <div className="d-flex align-items-start gap-3">
                  <span className="fs-6">📍</span>
                  <div>
                    <span className="text-muted fw-bold extra-small text-uppercase d-block mb-0.5">
                      LOCATION
                    </span>
                    <span className="fw-semibold text-dark extra-small">{workerData.location}</span>
                  </div>
                </div>

                {/* Rate */}
                <div className="d-flex align-items-start gap-3">
                  <span className="fs-6">💵</span>
                  <div>
                    <span className="text-muted fw-bold extra-small text-uppercase d-block mb-0.5">
                      RATE
                    </span>
                    <span className="fw-semibold text-dark extra-small">{workerData.hourlyRate}/hr</span>
                  </div>
                </div>

                {/* Availability */}
                <div className="d-flex align-items-start gap-3">
                  <span className="fs-6 text-teal">✅</span>
                  <div>
                    <span className="text-muted fw-bold extra-small text-uppercase d-block mb-0.5">
                      AVAILABILITY
                    </span>
                    <span className="fw-semibold text-dark extra-small">{workerData.availability}</span>
                  </div>
                </div>

                {/* Response */}
                <div className="d-flex align-items-start gap-3">
                  <span className="fs-6 text-warning">⚡</span>
                  <div>
                    <span className="text-muted fw-bold extra-small text-uppercase d-block mb-0.5">
                      RESPONSE
                    </span>
                    <span className="fw-semibold text-dark extra-small">{workerData.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Terciario: Works In */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <span className="text-muted fw-bold extra-small text-uppercase d-block mb-3">
                WORKS IN
              </span>
              <div className="d-flex flex-wrap gap-2">
                {workerData.worksIn.map((item, index) => (
                  <span
                    key={index}
                    className="badge fw-medium px-3 py-1.5 rounded-pill text-dark bg-light border border-light-subtle extra-small"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: Pestañas + Secciones (Overview / Reviews / History) */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-4">
            
            {/* Navegación por Pestañas */}
            <div className="bg-white rounded-3 p-1 shadow-sm d-flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`btn flex-fill py-2 extra-small fw-bold rounded-3 transition-all border-0 ${
                  activeTab === 'overview' ? 'text-white' : 'text-muted bg-transparent'
                }`}
                style={{
                  backgroundColor: activeTab === 'overview' ? '#0f172a' : 'transparent',
                }}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`btn flex-fill py-2 extra-small fw-bold rounded-3 transition-all border-0 ${
                  activeTab === 'reviews' ? 'text-white' : 'text-muted bg-transparent'
                }`}
                style={{
                  backgroundColor: activeTab === 'reviews' ? '#0f172a' : 'transparent',
                }}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`btn flex-fill py-2 extra-small fw-bold rounded-3 transition-all border-0 ${
                  activeTab === 'history' ? 'text-white' : 'text-muted bg-transparent'
                }`}
                style={{
                  backgroundColor: activeTab === 'history' ? '#0f172a' : 'transparent',
                }}
              >
                History
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="d-flex flex-column gap-4">
                {/* About */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                  <h2 className="h6 fw-bold text-dark mb-3">About</h2>
                  <p className="text-secondary extra-small mb-0 lh-base">
                    {workerData.about}
                  </p>
                </div>

                {/* Skills */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                  <h2 className="h6 fw-bold text-dark mb-3">Skills</h2>
                  <div className="d-flex flex-wrap gap-2">
                    {workerData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="badge fw-medium px-3 py-2 rounded-pill text-dark bg-light border border-light-subtle extra-small"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                  <h2 className="h6 fw-bold text-dark mb-3">Work experience</h2>
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-2.5">
                    {workerData.experience.map((exp, index) => (
                      <li key={index} className="d-flex align-items-start gap-2 extra-small text-dark">
                        <span className="text-teal fw-bold">•</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: REVIEWS */}
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
                        <span className="text-warning extra-small">
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

            {/* TAB 3: HISTORY */}
            {activeTab === 'history' && (
              <div className="d-flex flex-column gap-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="card border-0 shadow-sm rounded-4 p-4 bg-white d-flex flex-row align-items-center justify-content-between"
                  >
                    <div>
                      <h3 className="h6 fw-bold text-dark mb-1">{item.jobTitle}</h3>
                      <p className="text-muted extra-small mb-0">
                        🏢 {item.company} · 📅 {item.date}
                      </p>
                    </div>

                    <span
                      className="badge fw-medium px-2.5 py-1 rounded-pill extra-small"
                      style={{ backgroundColor: '#e6f7f4', color: '#0b9982' }}
                    >
                      {item.status}
                    </span>
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