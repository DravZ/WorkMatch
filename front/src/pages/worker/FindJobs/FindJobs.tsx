import React, { useEffect, useState } from 'react';

import styles from './FindJobs.module.css';

import {
  JobCard,
  type JobData,
} from '../../../components/worker/FindJobs/JobCard/JobCard';

import type { StatusType } from '../../../components/worker/Dashboard/StatusBadge/StatusBadge_W';

const CATEGORIES = [
  'All',
  'Technology & IT',
  'Engineering & Technical',
  'Construction & Skilled Trades',
  'Healthcare & Wellness',
  'Education & Training',
  'Business, Finance & Administration',
  'Sales & Customer Service',
  'Marketing, Media & Creative',
  'Hospitality, Food & Tourism',
  'Transportation & Logistics',
  'Retail & Commerce',
  'Security & Public Safety',
  'Agriculture & Environmental',
  'Science & Research',
  'Legal & Government',
  'Cleaning & Maintenance',
  'Personal & Community Services',
  'Other',
];

function getTimeAgo(dateString: string): string {
  if (!dateString) return 'Reciente';

  const now = new Date();
  const pastDate = new Date(dateString);

  const diffInMs = now.getTime() - pastDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'today';
  } else if (diffInDays === 1) {
    return '1 d ago';
  } else if (diffInDays < 7) {
    return `${diffInDays} d ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return weeks === 1 ? '1 wk ago' : `${weeks} wk ago`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? '1 mo ago' : `${months} mo ago`;
  }
}

interface VacanteApi {
  id_vacante: number;
  urgente?: boolean;
  titulo: string;
  categoria?: {
    text?: string;
    nombre?: string;
  } | string | null;
  empresa?: {
    nombre_empresa?: string;
  } | null;
  salario?: number | string | null;
  ubicacion?: string | null;
  horario?: string | null;
  habilidades_optimas?: string | string[] | null;
  empleados_necesarios?: number | null;
  fecha_publicacion?: string | null;
}

export const FindJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('Newest first');
  const [minPay, setMinPay] = useState('');

  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join("");
  };

  useEffect(() => {
    fetch('http://localhost:3000/vacante')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        return res.json();
      })
      .then((data: VacanteApi[]) => {
        const formattedJobs: JobData[] = data.map((vacante) => {
          let categoryText = 'Other';

          if (
            typeof vacante.categoria === 'object' &&
            vacante.categoria?.text
          ) {
            categoryText = vacante.categoria.text;
          } else if (typeof vacante.categoria === 'string') {
            categoryText = vacante.categoria;
          } else if (
            typeof vacante.categoria === 'object' &&
            vacante.categoria?.nombre
          ) {
            categoryText = vacante.categoria.nombre;
          }

          const companyName =
            vacante.empresa?.nombre_empresa || 'Empresa Confidencial';

          const companyInitials = getInitials(vacante.empresa?.nombre_empresa || 'N A')

          const statusTag: StatusType = vacante.urgente
            ? ('Urgent' as StatusType)
            : ('Open' as StatusType);
          let tags: string[] = [];

          if (Array.isArray(vacante.habilidades_optimas)) {
            tags = vacante.habilidades_optimas;
          } else if (typeof vacante.habilidades_optimas === 'string') {
            tags = vacante.habilidades_optimas
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0);
          }


          return {
            id: String(vacante.id_vacante),
            title: vacante.titulo,
            category: categoryText,
            company: companyName,

            /*
             * Estos valores no existen en los datos utilizados
             * por la página guía. Se mantienen aquí únicamente
             * si JobData los requiere.
             */
            isVerified: true,
            companyInitials,

            rate: Number(vacante.salario) || 0,
            location: vacante.ubicacion || '',
            schedule: vacante.horario || 'Tiempo completo',
            tags,
            spots: vacante.empleados_necesarios || 1,

            postedAgo: getTimeAgo(vacante.fecha_publicacion || ''),
            statusTag,

            /*
             * Se utiliza únicamente para ordenar por fecha.
             * No afecta al JobCard.
             */
            rawDate: vacante.fecha_publicacion || '',
          } as JobData & {
            rawDate: string;
          };
        });

        setJobs(formattedJobs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al conectar con el backend:', err);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs
    .filter((job) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        job.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMinPay =
        minPay === '' || job.rate >= Number(minPay);

      return matchesCategory && matchesSearch && matchesMinPay;
    })
    .sort((a, b) => {
      if (sortBy === 'Highest pay') {
        return b.rate - a.rate;
      }

      if (sortBy === 'Lowest pay') {
        return a.rate - b.rate;
      }

      if (sortBy === 'Newest first') {
        const dateA = new Date(
          (a as JobData & { rawDate?: string }).rawDate || ''
        ).getTime();

        const dateB = new Date(
          (b as JobData & { rawDate?: string }).rawDate || ''
        ).getTime();

        return dateB - dateA;
      }

      return 0;
    });

  const handleClearAll = () => {
    setSelectedCategory('All');
    setMinPay('');
    setSearchTerm('');
  };

  const handleApply = (id: string) => {
    console.log('Applied to job:', id);
  };

  if (loading) {
    return (
      <div
        className="min-vh-100 bg-light d-flex align-items-center justify-content-center"
      >
        Cargando vacantes...
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <main className="container py-4">

        {/* Header Principal */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="h3 fw-bold text-dark mb-1">
              Find work nearby
            </h1>

            <p className="text-muted small mb-0">
              {filteredJobs.length} jobs available right now
            </p>
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
            <div
              className={`d-flex align-items-center px-3 ${styles.searchBar}`}
            >
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
          <div
            className={`p-4 bg-white mb-4 ${styles.filterPanel}`}
          >
            <div className="row g-3 align-items-end">
              <div className="col-12 col-md-4">
                <label className={styles.filterLabel}>
                  CATEGORY
                </label>

                <select
                  className="form-select border-light-subtle"
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value)
                  }
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className={styles.filterLabel}>
                  MIN PAY ($/HR)
                </label>

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
                  onClick={handleClearAll}
                  className={`btn p-0 border-0 ${styles.clearBtn}`}
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chips de Categorías */}
        <div
          className="d-flex gap-2 mb-4 overflow-auto"
          style={{
            flexWrap: 'nowrap',
            scrollbarWidth: 'none',
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.categoryChip} ${selectedCategory === cat ? styles.activeChip : ''
                }`}
              style={{
                flex: '0 0 auto',
                whiteSpace: 'nowrap',
              }}
            >
              {cat}
            </button>
          ))}
        </div>


        {/* Grid de Empleos */}
        <div className="row g-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="col-12 col-md-6 col-lg-4"
              >
                <JobCard
                  job={job}
                  onApply={handleApply}
                />
              </div>
            ))
          ) : (
            <div className="col-12">
              <p
                className="text-center text-muted py-5 mb-0"
              >
                No jobs found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
