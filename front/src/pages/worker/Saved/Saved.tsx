import React, { useState } from 'react';
import { JobCard, type Job } from '../../../components/worker/Saved/JobCard/JobCard';
import { EmptyState } from '../../../components/worker/Saved/EmptyState/EmptyState';

export const Saved: React.FC = () => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([
    {
      id: '1',
      category: 'DELIVERY',
      title: 'Warehouse Picker & Packer',
      company: 'Metro Logistics Co.',
      pay: '$22/hr',
      location: 'Brooklyn, NY',
      schedule: 'Mon–Fri, 7am–3pm',
      tags: ['Physical fitness', 'Attention to detail', 'Forklift (optional)'],
      isSaved: true,
    },
    {
      id: '2',
      category: 'EVENTS',
      title: 'Event Setup Crew',
      company: 'Prestige Events Group',
      pay: '$25/hr',
      location: 'Manhattan, NY',
      schedule: 'Sat, 6am–2pm',
      tags: ['Physical fitness', 'Team player', 'Following directions'],
      isSaved: true,
    },
    {
      id: '3',
      category: 'CLEANING',
      title: 'Office Deep Clean',
      company: 'Stark Financial Group',
      pay: '$320',
      location: 'Midtown, NY',
      schedule: 'Sun, 8am–12pm',
      tags: ['Professional cleaning', 'Disinfection', 'Carpet cleaning'],
      isSaved: true,
    },
  ]);

  const handleRemoveSaved = (id: string) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const handleApply = (id: string) => {
    const job = savedJobs.find((j) => j.id === id);
    if (job) alert(`Applied to ${job.title}`);
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">

      <main className="container-fluid max-w-7xl px-3 px-md-5 py-4 py-md-5 flex-grow-1">
        <header className="mb-4">
          <h1 className="h3 fw-bold text-dark mb-1">Saved jobs</h1>
          <p className="text-muted small mb-0">{savedJobs.length} saved jobs</p>
        </header>

        {savedJobs.length > 0 ? (
          <div className="row g-4">
            {savedJobs.map((job) => (
              <div key={job.id} className="col-12 col-md-6 col-lg-4">
                <JobCard
                  job={job}
                  onApply={handleApply}
                  onToggleSave={handleRemoveSaved}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="♥"
            title="No saved jobs yet"
            description="When you find a job you are interested in, tap the heart icon to save it for later."
          />
        )}
      </main>
    </div>
  );
};