import React from 'react';
import { JobHeaderCard } from '../../../components/worker/WorkerJobView/JobHeaderCard/JobHeaderCard';
import { JobActionCard } from '../../../components/worker/WorkerJobView/JobActionCard/JobActionCard';
import { EmployerCard } from '../../../components/worker/WorkerJobView/EmployerCard/EmployerCard';

export const WorkerJobView: React.FC = () => {
  const jobDetails = {
    title: 'Warehouse Picker & Packer',
    companyName: 'Metro Logistics Co.',
    isVerified: true,
    hourlyRate: 22,
    estimatedEarnings: 176,
    location: 'Brooklyn, NY',
    distance: '2.4 km',
    date: '2026-08-15',
    schedule: 'Mon–Fri, 7am–3pm',
    spotsLeft: 2,
    totalSpots: 4,
    postedDate: '2026-08-12',
    description:
      'Metro Logistics is looking for experienced pickers and packers to join our warehouse team. You will be responsible for accurately picking customer orders, packaging items, and ensuring quality control. This is a physically demanding role that requires standing for extended periods and lifting up to 25kg.',
    requirements: [
      'Must be able to lift 25kg',
      'Steel-toed boots required',
      'Reliable transportation',
    ],
    skills: ['Physical fitness', 'Attention to detail', 'Forklift (optional)'],
    employer: {
      name: 'Metro Logistics Co.',
      initials: 'ML',
      rating: 4.7,
      reviewsCount: 78,
    },
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">

      <main className="container-fluid max-w-7xl px-3 px-md-5 py-4 flex-grow-1">
        <div className="row g-4">
          {/* Columna Izquierda: Información Principal del Trabajo */}
          <div className="col-12 col-lg-8">
            <JobHeaderCard
              title={jobDetails.title}
              companyName={jobDetails.companyName}
              isVerified={jobDetails.isVerified}
              hourlyRate={jobDetails.hourlyRate}
              location={jobDetails.location}
              distance={jobDetails.distance}
              date={jobDetails.date}
              schedule={jobDetails.schedule}
              spotsLeft={jobDetails.spotsLeft}
              totalSpots={jobDetails.totalSpots}
            />

            {/* About this job */}
            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
              <h2 className="h6 fw-bold text-dark mb-3">About this job</h2>
              <p className="text-muted small mb-0 lh-lg">{jobDetails.description}</p>
            </div>

            {/* Requirements */}
            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
              <h2 className="h6 fw-bold text-dark mb-3">Requirements</h2>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                {jobDetails.requirements.map((req, idx) => (
                  <li key={idx} className="d-flex align-items-center gap-2 text-muted small">
                    <span className="text-teal">→</span> {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills needed */}
            <div className="card border-0 shadow-sm p-4 rounded-4">
              <h2 className="h6 fw-bold text-dark mb-3">Skills needed</h2>
              <div className="d-flex flex-wrap gap-2">
                {jobDetails.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 bg-light text-secondary rounded-3 extra-small fw-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Acciones y Detalle del Empleador */}
          <div className="col-12 col-lg-4">
            <JobActionCard
              hourlyRate={jobDetails.hourlyRate}
              estimatedEarnings={jobDetails.estimatedEarnings}
              postedDate={jobDetails.postedDate}
              spotsRemaining={jobDetails.spotsLeft}
            />

            <EmployerCard
              companyName={jobDetails.employer.name}
              initials={jobDetails.employer.initials}
              rating={jobDetails.employer.rating}
              reviewsCount={jobDetails.employer.reviewsCount}
            />

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link text-muted extra-small p-0 border-0 text-decoration-none"
              >
                Report this job
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};