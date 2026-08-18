import React, { useState } from 'react';
import styles from './FindJobs.module.css';
import { JobCard, type JobData } from '../../../components/worker/FindJobs/JobCard/JobCard';
import type { StatusType } from '../../../components/worker/Dashboard/StatusBadge/StatusBadge_W';

export const FindJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('Newest first');
  const [minPay, setMinPay] = useState('');

  const categories = ['All', 'Delivery', 'Events', 'Cleaning', 'Hospitality', 'Moving', 'Security'];

  const jobsData: JobData[] = [
    {
      id: '1',
      title: 'Warehouse Picker & Packer',
      category: 'DELIVERY',
      company: 'Metro Logistics Co.',
      isVerified: true,
      companyInitials: 'ML',
      companyBgColor: '#0b8070',
      rate: 22,
      location: 'Brooklyn, NY',
      schedule: 'Mon–Fri, 7am–3pm',
      tags: ['Physical fitness', 'Attention to detail', 'Forklift (optional)'],
      spots: 2,
      postedAgo: '6d ago',
      statusTag: 'Open' as StatusType,
    },
    {
      id: '2',
      title: 'House Moving Crew Member',
      category: 'MOVING',
      company: 'Swift Move NYC',
      isVerified: true,
      companyInitials: 'SM',
      companyBgColor: '#1e3a8a',
      rate: 28,
      location: 'Queens, NY',
      schedule: 'Mon, 8am–5pm',
      tags: ['Heavy lifting', 'Furniture assembly', 'Safe packing'],
      spots: 1,
      postedAgo: '6d ago',
      statusTag: 'Open' as StatusType,
    },
    {
      id: '3',
      title: 'Event Setup Crew',
      category: 'EVENTS',
      company: 'Prestige Events Group',
      isVerified: true,
      companyInitials: 'PE',
      companyBgColor: '#831843',
      rate: 25,
      location: 'Manhattan, NY',
      schedule: 'Sat, 6am–2pm',
      tags: ['Physical fitness', 'Team player', 'Following directions'],
      spots: 3,
      postedAgo: '7d ago',
      statusTag: 'Urgent' as StatusType,
    },
  ];

  const handleApply = (id: string) => {
    console.log('Applied to job:', id);
  };

  return (
    <div className="min-vh-100 bg-light">

      <main className="container py-4">
        {/* Header Principal */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="h3 fw-bold text-dark mb-1">Find work nearby</h1>
            <p className="text-muted small mb-0">{jobsData.length} jobs available right now</p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${styles.filterToggleBtn}`}
          >
            ⚙ {showFilters ? 'Hide filters' : 'Filters'}
          </button>
        </div>

        {/* Barra de Búsqueda y Dropdown de Orden */}
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-9">
            <div className={`d-flex align-items-center px-3 ${styles.searchBar}`}>
              <span className="me-2 text-muted">🔍</span>
              <input
                type="text"
                className="form-control border-0 bg-transparent shadow-none"
                placeholder="Job title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-3">
            <select
              className={`form-select ${styles.sortSelect}`}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Newest first">Newest first</option>
              <option value="Highest pay">Highest pay</option>
              <option value="Lowest pay">Lowest pay</option>
            </select>
          </div>
        </div>

        {/* Panel Desplegable de Filtros Avanzados */}
        {showFilters && (
          <div className={`p-4 bg-white mb-4 ${styles.filterPanel}`}>
            <div className="row g-3 align-items-end">
              <div className="col-12 col-md-4">
                <label className={styles.filterLabel}>CATEGORY</label>
                <select
                  className="form-select border-light-subtle"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className={styles.filterLabel}>MIN PAY ($/HR)</label>
                <input
                  type="number"
                  className="form-control border-light-subtle"
                  placeholder="e.g. 15"
                  value={minPay}
                  onChange={(e) => setMinPay(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-4 text-md-end">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setMinPay('');
                  }}
                  className={`btn p-0 border-0 ${styles.clearBtn}`}
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chips de Categorías */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.categoryChip} ${
                selectedCategory === cat ? styles.activeChip : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Empleos */}
        <div className="row g-4">
          {jobsData.map((job) => (
            <div key={job.id} className="col-12 col-md-6 col-lg-4">
              <JobCard job={job} onApply={handleApply} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};