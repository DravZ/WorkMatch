import React, { useState, useEffect } from 'react';
import { JobCard } from '../../../components/guest/FindWork/temp';
import styles from './FindWork.module.css';

const CATEGORIES = ['All', 'Delivery', 'Events', 'Cleaning', 'Hospitality', 'Moving', 'Security'];

export default function FindWork() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Newest first');
  const [showFilters, setShowFilters] = useState(false);
  const [minPay, setMinPay] = useState('');

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/vacante')
      .then((res) => res.json())
      .then((data) => {
        const formattedJobs = data.map((vacante: any) => ({
          id: vacante.id_vacante,
          status: vacante.estado || 'Open',
          title: vacante.titulo,
          category: vacante.categoria?.nombre ? vacante.categoria.nombre.toUpperCase() : 'GENERAL',
          companyName: vacante.empresa?.nombre_empresa || 'Empresa Confidencial',
          companyLogoText: vacante.empresa?.nombre_empresa ? vacante.empresa.nombre_empresa.substring(0, 2).toUpperCase() : 'WM',
          verifiedText: 'Verified',
          payRate: Number(vacante.salario) || 0,
          location: vacante.ubicacion,
          schedule: vacante.horario || 'Tiempo completo', 
          tags: [vacante.tipo_pago],
          spots: vacante.empleados_necesarios || 1,
          timeAgo: vacante.fecha_publicacion ? 'Reciente' : 'Hace unos días'
        }));

        setJobs(formattedJobs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al conectar con el backend:', err);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = activeCategory === 'All' || job.category.toLowerCase() === activeCategory.toLowerCase();
    
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMinPay = minPay === '' || job.payRate >= Number(minPay);

    return matchesCategory && matchesSearch && matchesMinPay;
  }).sort((a, b) => {
    if (sortBy === 'Highest pay') return b.payRate - a.payRate;
    if (sortBy === 'Lowest pay') return a.payRate - b.payRate;
    return 0; 
  });

  const handleClearAll = () => {
    setActiveCategory('All');
    setMinPay('');
    setSearchTerm('');
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando vacantes...</div>;
  }

  return (
    <div className={styles.jobSearchContainer}>
      <div className={styles.jobSearchHeader}>
        <div>
          <h1>Find work nearby</h1>
          <p>{filteredJobs.length} jobs available right now</p>
        </div>
        <button 
          className={styles.filtersBtn}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide filters' : '⚙ Filters'}
        </button>
      </div>

      <div className={styles.searchFiltersGrid}>
        <div className={styles.searchInputWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Job title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.selectWrapper}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option>Newest first</option>
            <option>Highest pay</option>
            <option>Lowest pay</option>
          </select>
          <span className={styles.selectArrow}>▼</span>
        </div>
      </div>

      {showFilters && (
        <div className={styles.advancedFiltersPanel}>
          <div className={styles.filterGroup}>
            <label>CATEGORY</label>
            <div className={styles.selectWrapperSmall}>
              <select 
                value={activeCategory} 
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className={styles.selectArrow}>▼</span>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>MIN PAY ($/HR)</label>
            <input 
              type="number" 
              placeholder="e.g. 15" 
              value={minPay}
              onChange={(e) => setMinPay(e.target.value)}
              className={styles.minPayInput}
            />
          </div>

          <button className={styles.clearAllBtn} onClick={handleClearAll}>
            Clear all
          </button>
        </div>
      )}

      <div className={styles.categoriesScroll}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`${styles.categoryPill} ${activeCategory === cat ? styles.active : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.jobsGrid}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p style={{ gridColumn: 'span 2', textAlign: 'center', color: '#6b7280', padding: '32px' }}>
            No jobs found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}


