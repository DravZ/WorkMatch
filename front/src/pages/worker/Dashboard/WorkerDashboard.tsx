import React from 'react';
import { Link } from 'react-router-dom';
import styles from './WorkerDashboard.module.css';
import { StatusBadge_W, type StatusType } from '../../../components/worker/Dashboard/StatusBadge/StatusBadge_W';

export const WorkerDashboard: React.FC = () => {
  const upcomingWork = [
    { id: '1', title: 'Warehouse Picker & Packer', company: 'Metro Logistics Co.', date: '2026-08-15', rate: '$22/hr', status: 'Confirmed' as StatusType },
    { id: '2', title: 'Event Setup Crew', company: 'Prestige Events Group', date: '2026-08-16', rate: '$25/hr', status: 'Confirmed' as StatusType },
  ];

  const recentApplications = [
    { id: '1', title: 'Warehouse Picker & Packer', company: 'Metro Logistics Co.', date: '2026-08-10', status: 'Accepted' as StatusType },
    { id: '2', title: 'Event Setup Crew', company: 'Prestige Events Group', date: '2026-08-11', status: 'Accepted' as StatusType },
    { id: '3', title: 'Restaurant Kitchen Helper', company: 'Osteria Morandi', date: '2026-08-12', status: 'Pending' as StatusType },
    { id: '4', title: 'Office Cleaning — Midtown', company: 'CleanSpace Partners', date: '2026-08-05', status: 'Not selected' as StatusType },
  ];

  const recommendedJobs = [
    { id: '1', category: 'DELIVERY', title: 'Warehouse Picker & Packer', company: 'Metro Logistics Co.', location: 'Brooklyn, NY', pay: '$22/hr' },
    { id: '2', category: 'EVENTS', title: 'Event Setup Crew', company: 'Prestige Events Group', location: 'Manhattan, NY', pay: '$25/hr', isUrgent: true },
    { id: '3', category: 'CLEANING', title: 'Office Deep Clean', company: 'Stark Financial Group', location: 'Midtown, NY', pay: '$320' },
    { id: '4', category: 'HOSPITALITY', title: 'Restaurant Kitchen Helper', company: 'Osteria Morandi', location: 'West Village, NY', pay: '$18/hr' },
  ];

  const notifications = [
    { id: '1', icon: '✓', title: 'Application accepted', time: '2 hours ago', active: true },
    { id: '2', icon: '💬', title: 'New message from Metro Logistics', time: '4 hours ago', active: true },
    { id: '3', icon: '⭐', title: 'New review received', time: 'Yesterday', active: false },
    { id: '4', icon: '📋', title: 'New job matching your skills', time: 'Yesterday', active: false },
  ];

  return (
    <div className="min-vh-100 bg-light">

      <main className="container py-4">
        {/* Header Greeting */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className={styles.headerAvatar}>MT</div>
          <div>
            <h1 className="h3 fw-bold text-dark mb-0">Good morning, Marcus.</h1>
            <p className="text-muted small mb-0">1 pending application · 2 upcoming jobs</p>
          </div>
        </div>

        <div className="row g-4">
          {/* Columna Izquierda Principal */}
          <div className="col-12 col-lg-8">
            
            {/* Sección: Upcoming Work */}
            <div className={`p-4 bg-white mb-4 ${styles.contentCard}`}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h6 fw-bold text-dark mb-0">Upcoming work</h2>
                <Link to="/saved" className={styles.viewAllLink}>View all</Link>
              </div>

              <div className="d-flex flex-column gap-3">
                {upcomingWork.map((job) => (
                  <div key={job.id} className={`p-3 rounded-3 d-flex align-items-center justify-content-between ${styles.jobListCard}`}>
                    <div>
                      <h3 className="fw-bold text-dark fs-6 mb-1">{job.title}</h3>
                      <p className="text-muted small mb-0">{job.company} · {job.date}</p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="fw-bold text-teal">{job.rate}</span>
                      <StatusBadge_W status={job.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sección: Recent Applications */}
            <div className={`p-4 bg-white mb-4 ${styles.contentCard}`}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h6 fw-bold text-dark mb-0">Recent applications</h2>
                <Link to="/applications" className={styles.viewAllLink}>View all</Link>
              </div>

              <div className="d-flex flex-column">
                {recentApplications.map((app, idx) => (
                  <div 
                    key={app.id} 
                    className={`py-3 d-flex align-items-center justify-content-between ${
                      idx !== recentApplications.length - 1 ? 'border-bottom' : ''
                    }`}
                  >
                    <div>
                      <h3 className="fw-bold text-dark fs-6 mb-1">{app.title}</h3>
                      <p className="text-muted small mb-0">{app.company} · {app.date}</p>
                    </div>
                    <StatusBadge_W status={app.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Sección: Recommended for you */}
            <div className={`p-4 bg-white ${styles.contentCard}`}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h6 fw-bold text-dark mb-0">Recommended for you</h2>
                <Link to="/find-jobs" className={styles.viewAllLink}>Browse all</Link>
              </div>

              <div className="row g-3">
                {recommendedJobs.map((item) => (
                  <div key={item.id} className="col-12 col-md-6">
                    <div className={`p-3 rounded-3 h-100 d-flex flex-column justify-content-between ${styles.recommendedCard}`}>
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className={styles.categoryLabel}>{item.category}</span>
                          <span className="fw-bold text-teal">{item.pay}</span>
                        </div>
                        <h3 className="fw-bold text-dark fs-6 mb-1">{item.title}</h3>
                        <p className="text-muted small mb-0">{item.company} · {item.location}</p>
                      </div>
                      {item.isUrgent && (
                        <div className="mt-3">
                          <StatusBadge_W status="Urgent" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Columna Derecha Lateral */}
          <div className="col-12 col-lg-4">
            
            {/* Card: User Profile */}
            <div className={`p-4 bg-white mb-4 ${styles.contentCard}`}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className={styles.profileAvatar}>MT</div>
                <div>
                  <h3 className="fw-bold text-dark fs-6 mb-0">Marcus Thompson</h3>
                  <p className="text-muted small mb-0">⭐ 4.9 · 52 jobs done</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-muted small fw-medium">Profile strength</span>
                  <span className="fw-bold text-teal small">83%</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-teal" role="progressbar" style={{ width: '83%' }}></div>
                </div>
              </div>

              <Link to="/profile" className={`btn w-100 py-2 ${styles.btnSecondary}`}>
                View my profile
              </Link>
            </div>

            {/* Card: Notifications */}
            <div className={`p-4 bg-white mb-4 ${styles.contentCard}`}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h6 fw-bold text-dark mb-0">Notifications</h2>
                <Link to="/notifications" className={styles.viewAllLink}>View all</Link>
              </div>

              <div className="d-flex flex-column gap-2">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-3 rounded-3 d-flex align-items-start gap-2 ${
                      notif.active ? styles.notifActive : styles.notifInactive
                    }`}
                  >
                    <span className="fs-6 me-1">{notif.icon}</span>
                    <div>
                      <h4 className="fw-bold text-dark small mb-0">{notif.title}</h4>
                      <span className="text-muted extra-small">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card: Earnings (This Month) */}
            <div className={`p-4 ${styles.earningsCard}`}>
              <span className={styles.earningsSubtitle}>THIS MONTH</span>
              <h2 className="display-6 fw-bold my-1">$1,284</h2>
              <p className={styles.earningsSummary}>Across 6 completed jobs</p>

              <div className="d-flex align-items-center gap-4 mt-4 pt-2 border-top border-secondary border-opacity-25">
                <div>
                  <span className={styles.statLabel}>Avg. rate</span>
                  <p className="fw-bold fs-6 mb-0">$24/hr</p>
                </div>
                <div>
                  <span className={styles.statLabel}>Hours worked</span>
                  <p className="fw-bold fs-6 mb-0">52h</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};