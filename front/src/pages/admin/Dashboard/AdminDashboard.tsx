import React, { useState } from 'react';
import { StatusBadge, type StatusType } from '../../../components/admin/Dashboard/StatudBadge/StatusBadge';
import { ReportCardItem, type ReportData } from '../../../components/admin/Dashboard/ReportCardItem/ReportCardItem';
import { StatCard } from '../../../components/admin/Dashboard/StatCard/StatCard';

type TabType = 'Overview' | 'Users' | 'Jobs' | 'Reports';

interface UserRow {
  id: string;
  name: string;
  role: 'Worker' | 'Employer';
  joined: string;
  jobs: number;
  status: StatusType;
}

interface JobRow {
  id: string;
  title: string;
  employer: string;
  category: string;
  pay: string;
  spots: string;
  status: StatusType;
}

export const AdminOperationsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');

  // Datos mock exactos de la vista "Users"
  const users: UserRow[] = [
    { id: '1', name: 'Marcus Thompson', role: 'Worker', joined: '2025-03-12', jobs: 52, status: 'Active' },
    { id: '2', name: 'Priya Nair', role: 'Worker', joined: '2025-06-01', jobs: 34, status: 'Active' },
    { id: '3', name: 'Metro Logistics Co.', role: 'Employer', joined: '2023-03-15', jobs: 89, status: 'Active' },
    { id: '4', name: 'James Kowalski', role: 'Worker', joined: '2026-07-20', jobs: 0, status: 'Pending' },
    { id: '5', name: 'Elena Petrov', role: 'Worker', joined: '2026-08-01', jobs: 3, status: 'Active' },
  ];

  // Datos mock exactos de la vista "Jobs"
  const jobs: JobRow[] = [
    { id: '1', title: 'Warehouse Picker & Packer', employer: 'Metro Logistics Co.', category: 'Delivery', pay: '$22/hr', spots: '2/4', status: 'open' },
    { id: '2', title: 'Event Setup Crew', employer: 'Prestige Events Group', category: 'Events', pay: '$25/hr', spots: '3/6', status: 'urgent' },
    { id: '3', title: 'Office Deep Clean', employer: 'Stark Financial Group', category: 'Cleaning', pay: '$320', spots: '2/2', status: 'open' },
    { id: '4', title: 'Restaurant Kitchen Helper', employer: 'Osteria Morandi', category: 'Hospitality', pay: '$18/hr', spots: '1/1', status: 'open' },
    { id: '5', title: 'House Moving Crew Member', employer: 'Swift Move NYC', category: 'Moving', pay: '$28/hr', spots: '1/3', status: 'open' },
  ];

  // Datos mock exactos de los Reportes
  const reports: ReportData[] = [
    { id: '1', title: 'Suspected fraudulent posting', icon: 'job', typeText: 'Job', reporter: 'Anonymous', date: '2026-08-12', status: 'open_capital' },
    { id: '2', title: 'Inappropriate behavior on job site', icon: 'user', typeText: 'User', reporter: 'Marcus T.', date: '2026-08-11', status: 'open_capital' },
    { id: '3', title: 'Payment not received', icon: 'user', typeText: 'User', reporter: 'Sofia R.', date: '2026-08-10', status: 'Resolved' },
    { id: '4', title: 'Pay rate misrepresented', icon: 'job', typeText: 'Job', reporter: 'David C.', date: '2026-08-09', status: 'reviewing' },
  ];

  return (
    <div className="min-vh-100 bg-light py-4 py-md-5 px-3">
      <div className="container" style={{ maxWidth: '1080px' }}>
        
        {/* Title & Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold text-dark mb-0">Operations Dashboard</h1>
          <span className="text-muted extra-small">Last updated: 2 minutes ago</span>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-3 p-1 shadow-sm d-flex mb-4">
          {(['Overview', 'Users', 'Jobs', 'Reports'] as TabType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`btn flex-fill py-2 border-0 fw-bold rounded-3 extra-small transition-all ${
                activeTab === tab ? 'text-white' : 'text-muted bg-transparent'
              }`}
              style={{
                backgroundColor: activeTab === tab ? '#0f172a' : 'transparent',
              }}
            >
              {tab}
              {tab === 'Reports' && (
                <span
                  className="badge rounded-circle text-white ms-1.5 px-1.5 py-0.5"
                  style={{ backgroundColor: '#0b9982', fontSize: '0.65rem' }}
                >
                  2
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'Overview' && (
          <div className="d-flex flex-column gap-4">
            {/* Top 5 Stat Cards */}
            <div className="row g-3">
              <div className="col-12 col-sm-6 col-lg">
                <StatCard label="TOTAL USERS" value="14,832" subtext="9,241 workers, 3,109 employers" />
              </div>
              <div className="col-12 col-sm-6 col-lg">
                <StatCard label="JOBS POSTED" value="2,847" subtext="Active postings" />
              </div>
              <div className="col-12 col-sm-6 col-lg">
                <StatCard label="JOBS COMPLETED" value="21,453" subtext="All time" isHighlight />
              </div>
              <div className="col-12 col-sm-6 col-lg">
                <StatCard label="PENDING REPORTS" value="12" subtext="Needs attention" isHighlight hasBorder />
              </div>
              <div className="col-12 col-sm-6 col-lg">
                <StatCard label="MONTHLY REVENUE" value="$184,200" subtext="From service fees" />
              </div>
            </div>

            {/* Bottom 2 Columns Grid */}
            <div className="row g-4">
              {/* Left Column: Recent Job Postings */}
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                  <h2 className="h6 fw-bold text-dark mb-3">Recent job postings</h2>
                  <div className="table-responsive">
                    <table className="table table-borderless align-middle mb-0" style={{ fontSize: '0.75rem' }}>
                      <thead>
                        <tr className="text-muted text-uppercase fw-bold border-bottom" style={{ fontSize: '0.65rem' }}>
                          <th className="ps-0 py-2">TITLE</th>
                          <th className="py-2">CATEGORY</th>
                          <th className="py-2">PAY</th>
                          <th className="pe-0 py-2">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map((job) => (
                          <tr key={job.id} className="border-bottom border-light">
                            <td className="ps-0 fw-semibold text-dark py-3">{job.title}</td>
                            <td className="text-muted py-3">{job.category}</td>
                            <td className="fw-bold text-dark py-3">{job.pay}</td>
                            <td className="pe-0 py-3">
                              <StatusBadge status={job.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column: Open Reports */}
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                  <h2 className="h6 fw-bold text-dark mb-3">Open reports</h2>
                  <div className="d-flex flex-column gap-3">
                    {reports
                      .filter((r) => r.status !== 'Resolved')
                      .map((report) => (
                        <ReportCardItem key={report.id} report={report} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USERS */}
        {activeTab === 'Users' && (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h2 className="h6 fw-bold text-dark mb-3">All users</h2>
            <div className="table-responsive">
              <table className="table table-borderless align-middle mb-0" style={{ fontSize: '0.75rem' }}>
                <thead>
                  <tr className="text-muted text-uppercase fw-bold border-bottom" style={{ fontSize: '0.65rem' }}>
                    <th className="ps-0 py-2">NAME</th>
                    <th className="py-2">ROLE</th>
                    <th className="py-2">JOINED</th>
                    <th className="py-2">JOBS</th>
                    <th className="py-2">STATUS</th>
                    <th className="pe-0 py-2 text-end">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-bottom border-light">
                      <td className="ps-0 fw-semibold text-dark py-3">{user.name}</td>
                      <td className="py-3">
                        <span
                          className={`badge rounded-pill fw-medium px-2.5 py-1 ${
                            user.role === 'Employer'
                              ? 'bg-dark text-white'
                              : 'bg-light text-secondary border border-light-subtle'
                          }`}
                          style={{ fontSize: '0.65rem' }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="text-muted py-3">{user.joined}</td>
                      <td className="fw-bold text-dark py-3">{user.jobs}</td>
                      <td className="py-3">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="pe-0 py-3 text-end">
                        <div className="d-flex gap-2 justify-content-end align-items-center">
                          <button
                            type="button"
                            className="btn btn-outline-secondary bg-white text-dark border-light-subtle rounded-2 px-2.5 py-1 fw-semibold"
                            style={{ fontSize: '0.7rem' }}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-link text-danger text-decoration-none fw-semibold p-0 ms-1"
                            style={{ fontSize: '0.7rem' }}
                          >
                            Suspend
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: JOBS */}
        {activeTab === 'Jobs' && (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h2 className="h6 fw-bold text-dark mb-3">Job postings</h2>
            <div className="table-responsive">
              <table className="table table-borderless align-middle mb-0" style={{ fontSize: '0.75rem' }}>
                <thead>
                  <tr className="text-muted text-uppercase fw-bold border-bottom" style={{ fontSize: '0.65rem' }}>
                    <th className="ps-0 py-2">TITLE</th>
                    <th className="py-2">EMPLOYER</th>
                    <th className="py-2">CATEGORY</th>
                    <th className="py-2">PAY</th>
                    <th className="py-2">SPOTS</th>
                    <th className="py-2">STATUS</th>
                    <th className="pe-0 py-2 text-end">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-bottom border-light">
                      <td className="ps-0 fw-semibold text-dark py-3">{job.title}</td>
                      <td className="text-muted py-3">{job.employer}</td>
                      <td className="text-muted py-3">{job.category}</td>
                      <td className="fw-bold text-dark py-3">{job.pay}</td>
                      <td className="text-muted py-3">{job.spots}</td>
                      <td className="py-3">
                        <StatusBadge status={job.status} />
                      </td>
                      <td className="pe-0 py-3 text-end">
                        <div className="d-flex gap-2 justify-content-end align-items-center">
                          <button
                            type="button"
                            className="btn btn-outline-secondary bg-white text-dark border-light-subtle rounded-2 px-2.5 py-1 fw-semibold"
                            style={{ fontSize: '0.7rem' }}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-link text-danger text-decoration-none fw-semibold p-0 ms-1"
                            style={{ fontSize: '0.7rem' }}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: REPORTS */}
        {activeTab === 'Reports' && (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h2 className="h6 fw-bold text-dark mb-3">All reports</h2>
            <div className="d-flex flex-column gap-3">
              {reports.map((report) => (
                <ReportCardItem key={report.id} report={report} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};