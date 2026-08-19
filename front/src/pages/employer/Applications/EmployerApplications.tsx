import React, { useState } from 'react';
import { FilterTabs, type TabOption } from '../../../components/employer/Applications/FilterTabs/FilterTabs';
import { ApplicationCard, type Application } from '../../../components/employer/Applications/ApplicationCard/ApplicationCard';

const mockApplications: Application[] = [
  {
    id: '1',
    initials: 'MT',
    name: 'Marcus Thompson',
    rating: 4.9,
    jobsCompleted: 52,
    isVerified: true,
    appliedJob: 'Warehouse Picker & Packer',
    appliedDate: '2026-08-10',
    coverLetter:
      'I have 6 years of warehouse experience and am forklift certified. Available for your start date.',
    skills: ['Forklift certified', 'Inventory management', 'Heavy lifting'],
    status: 'accepted',
  },
  {
    id: '2',
    initials: 'DC',
    name: 'David Chen',
    rating: 4.6,
    jobsCompleted: 28,
    isVerified: true,
    appliedJob: 'Warehouse Picker & Packer',
    appliedDate: '2026-08-10',
    coverLetter:
      'I worked at a fulfillment center for 2 years and have experience with RF scanners and pick systems.',
    skills: ['RF scanner', 'Pick & pack', 'Pallet jack'],
    status: 'pending',
  },
  {
    id: '3',
    initials: 'SR',
    name: 'Sofia Ramirez',
    rating: 4.4,
    jobsCompleted: 15,
    isVerified: true,
    appliedJob: 'Warehouse Picker & Packer',
    appliedDate: '2026-08-11',
    coverLetter:
      'Quick learner, physically fit, and available immediately. Eager to gain more warehouse experience.',
    skills: ['Physical fitness', 'Fast learner', 'Team player'],
    status: 'pending',
  },
];

type TabType = 'all' | 'pending' | 'accepted' | 'rejected';

export const EmployerApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const pendingCount = applications.filter((a) => a.status === 'pending').length;
  const acceptedCount = applications.filter((a) => a.status === 'accepted').length;
  const rejectedCount = applications.filter((a) => a.status === 'rejected').length;

  const tabs: TabOption<TabType>[] = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending', count: pendingCount },
    { id: 'accepted', label: 'Accepted', count: acceptedCount },
    { id: 'rejected', label: 'Rejected', count: rejectedCount },
  ];

  const filteredApplications = applications.filter((app) => {
    if (activeTab === 'pending') return app.status === 'pending';
    if (activeTab === 'accepted') return app.status === 'accepted';
    if (activeTab === 'rejected') return app.status === 'rejected';
    return true;
  });

  const handleStatusChange = (
    id: string,
    newStatus: 'accepted' | 'rejected' | 'pending'
  ) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  return (
    <div className="min-vh-100 bg-light py-5 px-3">
      <div className="container max-w-3xl mx-auto" style={{ maxWidth: '820px' }}>
        <header className="mb-4 text-start">
          <h1 className="h3 fw-bold text-dark mb-1">Applications received</h1>
          <p className="text-muted small mb-0">
            {applications.length} total — {pendingCount} pending review
          </p>
        </header>

        {/* Pestañas Reutilizables */}
        <FilterTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {/* Lista de Solicitudes */}
        <div className="d-flex flex-column gap-3">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-4 border-0 shadow-sm text-muted extra-small">
              No applications found in this section.
            </div>
          ) : (
            filteredApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                app={app}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};