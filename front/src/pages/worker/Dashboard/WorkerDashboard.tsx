import React from 'react';
import { Link } from 'react-router-dom';
import styles from './WorkerDashboard.module.css';
import { StatusBadge_W, type StatusType } from '../../../components/worker/Dashboard/StatusBadge/StatusBadge_W';
import { useUser } from '../../../context/UserContext/UserContext';

export const WorkerDashboard: React.FC = () => {

  const {user} = useUser();
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

   const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join("");
  };

  return (
    <div className="min-vh-100 bg-light">

      <main className="container py-4">
        {/* Header Greeting */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className={styles.headerAvatar}>{getInitials(user?.nombreCompleto ?? '')}</div>
          <div>
            <h1 className="h3 fw-bold text-dark mb-0">Good morning, {user?.nombreCompleto}.</h1>
            {/*<p className="text-muted small mb-0">1 pending application · 2 upcoming jobs</p> */}
          </div>
        </div>

        <div className="row g-4">
          {/* Columna Izquierda Principal */}
          <div className="col-12 col-lg-12">
            
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

            {/* Sección: Recommended for you 
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
            */}
          </div>
        </div>
      </main>
    </div>
  );
};