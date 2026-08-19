import React from 'react';
import { EmployerStatCard } from '../../../components/employer/Dashboard/EmployerStatCard/EmployerStatCard';
import { ActiveJobItem } from '../../../components/employer/Dashboard/ActiveJobItem/ActiveJobItem';
import { ApplicationReviewCard } from '../../../components/employer/Dashboard/ApplicationReviewCard/ApplicationReviewCard';
import { MonthlySummaryCard } from '../../../components/employer/Dashboard/MonthlySummaryCard/MonthlySummaryCard';

export const EmployerDashboard: React.FC = () => {
  const activeJobs = [
    {
      id: '1',
      title: 'Warehouse Picker & Packer',
      location: 'Brooklyn, NY',
      schedule: 'Mon–Fri, 7am–3pm',
      spotsLeft: 2,
      totalSpots: 4,
    },
    {
      id: '2',
      title: 'Event Setup Crew',
      location: 'Manhattan, NY',
      schedule: 'Sat, 6am–2pm',
      spotsLeft: 3,
      totalSpots: 6,
      isUrgent: true,
    },
    {
      id: '3',
      title: 'Office Deep Clean',
      location: 'Midtown, NY',
      schedule: 'Sun, 8am–12pm',
      spotsLeft: 2,
      totalSpots: 2,
    },
    {
      id: '4',
      title: 'Restaurant Kitchen Helper',
      location: 'West Village, NY',
      schedule: 'Fri–Sat, 4pm–12am',
      spotsLeft: 1,
      totalSpots: 1,
    },
  ];

  const pendingApplications = [
    {
      id: 'app-1',
      workerName: 'David Chen',
      appliedRole: 'Warehouse Picker & Packer',
      date: '2026-08-10',
      rating: 4.6,
      jobsCount: 28,
      isVerified: true,
      comment:
        'I worked at a fulfillment center for 2 years and have experience with RF scanners and pick systems.',
      skills: ['RF scanner', 'Pick & pack', 'Pallet jack'],
    },
    {
      id: 'app-2',
      workerName: 'Sofia Ramirez',
      appliedRole: 'Warehouse Picker & Packer',
      date: '2026-08-11',
      rating: 4.4,
      jobsCount: 15,
      isVerified: false,
      comment:
        'Quick learner, physically fit, and available immediately. Eager to gain more warehouse experience.',
      skills: ['Physical fitness', 'Fast learner', 'Team player'],
    },
  ];

  const recentActivities = [
    { id: '1', title: 'Application accepted', time: '2 hours ago', icon: '✓' },
    { id: '2', title: 'New message from Metro Logistics', time: '4 hours ago', icon: '💬' },
    { id: '3', title: 'New review received', time: 'Yesterday', icon: '⭐' },
  ];

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">

      <main className="container-fluid max-w-7xl px-3 px-md-5 py-4 flex-grow-1">
        {/* Header Principal */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 fw-bold text-dark mb-1">Metro Logistics Dashboard</h1>
            <p className="text-muted small mb-0">2 new applications require your review.</p>
          </div>
          <button
            type="button"
            className="btn btn-teal px-4 py-2 text-white fw-semibold rounded-3"
            style={{ backgroundColor: '#0b9982' }}
          >
            + Post a job
          </button>
        </header>

        {/* Tarjetas de Estadísticas Principales */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <EmployerStatCard title="Active Jobs" value="4" subtitle="+1 this week" />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <EmployerStatCard
              title="New Applications"
              value="2"
              subtitle="Needs review"
              isHighlight
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <EmployerStatCard title="Workers Confirmed" value="3" subtitle="Next 7 days" />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <EmployerStatCard title="Avg. Fill Time" value="1.8h" subtitle="Better than avg." />
          </div>
        </div>

        {/* Layout Grid Principal */}
        <div className="row g-4">
          {/* Columna Izquierda: Jobs y Applications */}
          <div className="col-12 col-lg-8">
            {/* Seccion Active Jobs */}
            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h6 fw-bold text-dark mb-0">Active jobs</h2>
                <a
                  href="/employer/jobs/new"
                  className="text-teal text-decoration-none extra-small fw-semibold"
                >
                  Post a job
                </a>
              </div>

              <div>
                {activeJobs.map((job) => (
                  <ActiveJobItem
                    key={job.id}
                    title={job.title}
                    location={job.location}
                    schedule={job.schedule}
                    spotsLeft={job.spotsLeft}
                    totalSpots={job.totalSpots}
                    isUrgent={job.isUrgent}
                  />
                ))}
              </div>
            </div>

            {/* Seccion Applications to Review */}
            <div className="card border-0 shadow-sm p-4 rounded-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h6 fw-bold text-dark mb-0">Applications to review</h2>
                <a
                  href="/employer/applications"
                  className="text-teal text-decoration-none extra-small fw-semibold"
                >
                  View all
                </a>
              </div>

              <div>
                {pendingApplications.map((app) => (
                  <ApplicationReviewCard
                    key={app.id}
                    workerName={app.workerName}
                    appliedRole={app.appliedRole}
                    date={app.date}
                    rating={app.rating}
                    jobsCount={app.jobsCount}
                    isVerified={app.isVerified}
                    comment={app.comment}
                    skills={app.skills}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Quick Actions, Recent Activity, Monthly Summary */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-4">
            {/* Quick Actions */}
            <div className="card border-0 shadow-sm p-4 rounded-4">
              <h3 className="h6 fw-bold text-dark mb-3">Quick actions</h3>
              <div className="d-flex flex-column gap-2">
                <button
                  type="button"
                  className="btn text-white w-100 py-2.5 fw-semibold rounded-3 text-start px-3"
                  style={{ backgroundColor: '#0b9982' }}
                >
                  + Post a new job
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 py-2 fw-semibold rounded-3 text-start px-3 bg-white text-dark border-light-subtle"
                >
                  Review applications
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 py-2 fw-semibold rounded-3 text-start px-3 bg-white text-dark border-light-subtle"
                >
                  Browse workers
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 py-2 fw-semibold rounded-3 text-start px-3 bg-white text-dark border-light-subtle"
                >
                  View messages
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 py-2 fw-semibold rounded-3 text-start px-3 bg-white text-dark border-light-subtle"
                >
                  Company profile
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card border-0 shadow-sm p-4 rounded-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="h6 fw-bold text-dark mb-0">Recent activity</h3>
                <a
                  href="/employer/activity"
                  className="text-teal text-decoration-none extra-small fw-semibold"
                >
                  All
                </a>
              </div>

              <div className="d-flex flex-column gap-3">
                {recentActivities.map((act) => (
                  <div key={act.id} className="d-flex align-items-start gap-2.5 extra-small">
                    <span className="fs-6">{act.icon}</span>
                    <div>
                      <div className="fw-semibold text-dark">{act.title}</div>
                      <span className="text-muted">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Summary */}
            <MonthlySummaryCard
              hiredCount={12}
              jobsCount={5}
              avgRating={4.6}
              jobsCompleted="11 / 12"
            />
          </div>
        </div>
      </main>
    </div>
  );
};