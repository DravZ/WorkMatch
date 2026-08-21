import React, { useState } from 'react';
import { WorkerCard, type Worker } from '../../../components/employer/FindWorkers/WorkerCard/WorkerCard';

// Datos de prueba idénticos a los de las imágenes
const mockWorkers: Worker[] = [
  {
    id: '1',
    initials: 'AJ',
    avatarBg: '#0b9982',
    name: 'Aisha Johnson',
    title: 'Professional Cleaner & Organizer',
    hourlyRate: 24,
    rating: 5,
    reviewCount: 19,
    jobsCompleted: 21,
    isVerified: true,
    location: 'Harlem, NY',
    availability: 'Available now',
    skills: ['Deep cleaning', 'Airbnb turnover', 'Laundry'],
    extraSkillsCount: 2,
    category: 'Cleaning',
  },
  {
    id: '2',
    initials: 'MT',
    avatarBg: '#0b9982',
    name: 'Marcus Thompson',
    title: 'General Laborer & Warehouse Spe...',
    hourlyRate: 22,
    rating: 4.9,
    reviewCount: 47,
    jobsCompleted: 52,
    isVerified: true,
    location: 'Brooklyn, NY',
    availability: 'Available now',
    skills: ['Forklift certified', 'Inventory management', 'Heavy lifting'],
    extraSkillsCount: 2,
    category: 'Construction',
  },
  {
    id: '3',
    initials: 'EP',
    avatarBg: '#9f1239',
    name: 'Elena Petrov',
    title: 'Administrative & Data Entry Specia...',
    hourlyRate: 28,
    rating: 4.9,
    reviewCount: 11,
    jobsCompleted: 12,
    isVerified: true,
    location: 'Astoria, NY',
    availability: 'Flexible',
    skills: ['Excel', 'Data entry', 'Scheduling'],
    extraSkillsCount: 2,
    category: 'Administrative',
  },
];

const categories = [
  'All',
  'Delivery',
  'Moving',
  'Construction',
  'Cleaning',
  'Events',
  'Hospitality',
  'Administrative',
  'Security',
];

export const FindWorkers_Emp: React.FC = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('Top rated');
  const [maxRate, setMaxRate] = useState<string>('');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setMaxRate('');
    setVerifiedOnly(false);
    setSearchQuery('');
  };

  // Filtrado de trabajadores dinámico
  const filteredWorkers = mockWorkers.filter((worker) => {
    // Filtro por categoría
    if (selectedCategory !== 'All' && worker.category !== selectedCategory) {
      return false;
    }
    // Filtro por búsqueda
    if (
      searchQuery &&
      !worker.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !worker.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !worker.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !worker.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    // Filtro por tarifa máxima
    if (maxRate && worker.hourlyRate > Number(maxRate)) {
      return false;
    }
    // Filtro por verificado
    if (verifiedOnly && !worker.isVerified) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-vh-100 bg-light py-5 px-3">
      <div className="container max-w-5xl mx-auto" style={{ maxWidth: '1040px' }}>
        
        {/* Encabezado Superior */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
          <div>
            <h1 className="h3 fw-bold text-dark mb-1">Find workers</h1>
            <p className="text-muted small mb-0">
              {filteredWorkers.length} workers available to hire
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <a
              href="/employer/post-job"
              className="btn text-white px-3 py-2 fw-semibold rounded-3 extra-small text-decoration-none d-flex align-items-center gap-1"
              style={{ backgroundColor: '#0b9982' }}
            >
              <span>+</span> Post a job
            </a>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline-secondary px-3 py-2 fw-semibold rounded-3 extra-small bg-white text-dark border-light-subtle"
            >
              {showFilters ? 'Hide filters' : '⚙ Filters'}
            </button>
          </div>
        </div>

        {/* Barra de Búsqueda y Dropdown Ordenar */}
        <div className="row g-2 mb-3">
          <div className="col-12 col-md-9">
            <div className="position-relative">
              <span
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                style={{ fontSize: '0.85rem' }}
              >
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, skill, or location..."
                className="form-control bg-white border-0 shadow-sm ps-5 py-2.5 rounded-3 extra-small text-dark"
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="form-select bg-white border-0 shadow-sm py-2.5 rounded-3 extra-small text-dark fw-medium"
            >
              <option value="Top rated">Top rated</option>
              <option value="Most completed jobs">Most completed jobs</option>
              <option value="Lowest hourly rate">Lowest hourly rate</option>
              <option value="Highest hourly rate">Highest hourly rate</option>
            </select>
          </div>
        </div>

        {/* Panel Colapsable de Filtros Avanzados */}
        {showFilters && (
          <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-0">
            <div className="row g-3 align-items-end">
              <div className="col-12 col-md-4">
                <label className="form-label extra-small text-muted fw-bold text-uppercase mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-select bg-light border-0 py-2 extra-small rounded-3"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label extra-small text-muted fw-bold text-uppercase mb-2">
                  Max Rate ($/HR)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 30"
                  value={maxRate}
                  onChange={(e) => setMaxRate(e.target.value)}
                  className="form-control bg-light border-0 py-2 extra-small rounded-3"
                />
              </div>

              <div className="col-12 col-md-4 d-flex align-items-center justify-content-between pt-2">
                <div className="form-check mb-0">
                  <input
                    type="checkbox"
                    id="verifiedOnly"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="form-check-input"
                  />
                  <label
                    htmlFor="verifiedOnly"
                    className="form-check-label extra-small text-dark fw-medium ms-1"
                  >
                    Verified only
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="btn btn-link text-decoration-none text-muted extra-small fw-semibold p-0"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categorías Rápidas (Pills) */}
        <div className="d-flex align-items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn rounded-pill px-3 py-1.5 extra-small fw-medium border-0 transition-all flex-shrink-0 ${
                  isActive ? 'text-white' : 'bg-white text-muted shadow-sm'
                }`}
                style={{
                  backgroundColor: isActive ? '#0b9982' : '#ffffff',
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grid de Trabajadores */}
        {filteredWorkers.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm text-muted extra-small">
            No workers match your search criteria.
          </div>
        ) : (
          <div className="row g-4">
            {filteredWorkers.map((worker) => (
              <div key={worker.id} className="col-12 col-md-6 col-lg-4">
                <WorkerCard
                  worker={worker}
                  onInvite={(id) => console.log('Inviting worker:', id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};