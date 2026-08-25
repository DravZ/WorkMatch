import React, { useEffect, useMemo, useState } from 'react';
import styles from './FindWorkers_Emp.module.css';

import {
  WorkerCard,
  type Worker,
} from '../../../components/employer/FindWorkers/WorkerCard/WorkerCard';

import { getTrabajadores } from '../../../../services/trabajador';
import type { Trabajador } from '../../../../types/trabajador';

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

export const FindWorkers_Emp: React.FC = () => {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Top rated');
  const [maxRate, setMaxRate] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  /*
   * Obtener trabajadores desde el backend.
   *
   * Se utiliza el servicio existente en lugar de hacer
   * un fetch directamente desde el componente.
   */
  useEffect(() => {
    let active = true;

    const loadTrabajadores = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getTrabajadores();

        if (active) {
          setTrabajadores(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Error al obtener los trabajadores'
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadTrabajadores();

    return () => {
      active = false;
    };
  }, []);

  /*
   * Adaptamos el modelo del backend al modelo que espera WorkerCard.
   *
   * No se modifican los datos originales de Trabajador.
   */
  const workers = useMemo<Worker[]>(() => {
    return trabajadores.map((trabajador) => {
      const fullName =
        trabajador.usuario?.fullName?.trim() || 'Nombre no registrado';

      const nameParts = fullName.split(/\s+/);

      const initials = `${nameParts[0]?.[0] ?? ''}${
        nameParts[1]?.[0] ?? ''
      }`.toUpperCase();

      const skills =
        trabajador.habilidades?.map((habilidad) => habilidad.nombre) ?? [];

      return {
        id: String(trabajador.id_trabajador),

        initials,

        /*
         * No existe un color de avatar en Trabajador.
         * Se conserva el campo para WorkerCard sin inventar
         * un valor de negocio.
         */
        avatarBg: '',

        name: fullName,

        title:
          trabajador.especialidad_carrera ||
          'Sin especialidad registrada',

        hourlyRate: Number(trabajador.tarifa_hora) || 0,

        rating: Number(trabajador.calificacion) || 0,

        reviewCount:
          Number(trabajador.total_calificaciones) || 0,

        jobsCompleted:
          Number(trabajador.trabajos_completados) || 0,

        isVerified: trabajador.is_verified ?? false,

        location:
          trabajador.ubicacion || 'Ubicación no registrada',

        availability:
          trabajador.disponibilidad || '',

        skills: skills.slice(0, 3),

        /*
         * El componente muestra las habilidades principales
         * y las restantes como cantidad adicional.
         */
        extraSkillsCount: Math.max(skills.length - 3, 0),

        /*
         * Trabajador cuenta con area_trabajo.
         * Se utiliza como categoría porque es el campo del
         * backend que representa el área de trabajo.
         */
        category: trabajador.especialidad_carrera || '',
      };
    });
  }, [trabajadores]);

  /*
   * Aplicación de filtros.
   */
  const filteredWorkers = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const numericMaxRate =
      maxRate === '' ? null : Number(maxRate);

    return workers.filter((worker) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        worker.category.toLowerCase() ===
          selectedCategory.toLowerCase();

      const matchesSearch =
        normalizedSearch === '' ||
        worker.name.toLowerCase().includes(normalizedSearch) ||
        worker.title.toLowerCase().includes(normalizedSearch) ||
        worker.location.toLowerCase().includes(normalizedSearch) ||
        worker.skills.some((skill) =>
          skill.toLowerCase().includes(normalizedSearch)
        );

      const matchesRate =
        numericMaxRate === null ||
        worker.hourlyRate <= numericMaxRate;

      const matchesVerified =
        !verifiedOnly || worker.isVerified;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesRate &&
        matchesVerified
      );
    });
  }, [
    workers,
    selectedCategory,
    searchQuery,
    maxRate,
    verifiedOnly,
  ]);
  const sortedWorkers = useMemo(() => {
    const result = [...filteredWorkers];

    switch (sortOption) {
      case 'Top rated':
        result.sort((a, b) => b.rating - a.rating);
        break;

      case 'Most completed jobs':
        result.sort(
          (a, b) => b.jobsCompleted - a.jobsCompleted
        );
        break;

      case 'Lowest hourly rate':
        result.sort(
          (a, b) => a.hourlyRate - b.hourlyRate
        );
        break;

      case 'Highest hourly rate':
        result.sort(
          (a, b) => b.hourlyRate - a.hourlyRate
        );
        break;

      default:
        break;
    }

    return result;
  }, [filteredWorkers, sortOption]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setMaxRate('');
    setVerifiedOnly(false);
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light py-5 px-3">
        <div
          className="container max-w-5xl mx-auto text-center"
          style={{ maxWidth: '1040px' }}
        >
          <p className="text-muted">Cargando trabajadores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 bg-light py-5 px-3">
        <div
          className="container max-w-5xl mx-auto text-center"
          style={{ maxWidth: '1040px' }}
        >
          <p className="text-danger">
            Error: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5 px-3">
      <div
        className="container max-w-5xl mx-auto"
        style={{ maxWidth: '1040px' }}
      >

        {/* Encabezado Superior */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
          <div>
            <h1 className="h3 fw-bold text-dark mb-1">
              Find workers
            </h1>

            {/**<p className="text-muted small mb-0">
              {sortedWorkers.length} workers available to hire
            </p> */}
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
              onClick={() =>
                setShowFilters((prev) => !prev)
              }
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
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Name, skill, or location..."
                className="form-control bg-white border-0 shadow-sm ps-5 py-2.5 rounded-3 extra-small text-dark"
              />
            </div>
          </div>

          <div className="col-12 col-md-3">
            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value)
              }
              className="form-select bg-white border-0 shadow-sm py-2.5 rounded-3 extra-small text-dark fw-medium"
            >
              <option value="Top rated">
                Top rated
              </option>

              <option value="Most completed jobs">
                Most completed jobs
              </option>

              <option value="Lowest hourly rate">
                Lowest hourly rate
              </option>

              <option value="Highest hourly rate">
                Highest hourly rate
              </option>
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
                  onChange={(e) =>
                    setSelectedCategory(e.target.value)
                  }
                  className="form-select bg-light border-0 py-2 extra-small rounded-3"
                >
                  {CATEGORIES.map((cat) => (
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
                  onChange={(e) =>
                    setMaxRate(e.target.value)
                  }
                  className="form-control bg-light border-0 py-2 extra-small rounded-3"
                />
              </div>

              <div className="col-12 col-md-4 d-flex align-items-center justify-content-between pt-2">
                <div className="form-check mb-0">
                  <input
                    type="checkbox"
                    id="verifiedOnly"
                    checked={verifiedOnly}
                    onChange={(e) =>
                      setVerifiedOnly(e.target.checked)
                    }
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
        <div className={styles.noScrollbar + ` d-flex align-items-center gap-2 overflow-x-auto pb-3 mb-4`}>
          {CATEGORIES.map((category) => {
            const isActive =
              selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`btn rounded-pill px-3 py-1.5 extra-small fw-medium border-0 transition-all flex-shrink-0 ${
                  isActive
                    ? 'text-white'
                    : 'bg-white text-muted shadow-sm'
                }`}
                style={{
                  backgroundColor: isActive
                    ? '#0b9982'
                    : '#ffffff',
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grid de Trabajadores */}
        {sortedWorkers.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm text-muted extra-small">
            No workers match your search criteria.
          </div>
        ) : (
          <div className="row g-4">
            {sortedWorkers.map((worker) => (
              <div
                key={worker.id}
                className="col-12 col-md-6 col-lg-4"
              >
                <WorkerCard
                  worker={worker}
                  onInvite={(id) =>
                    console.log(
                      'Inviting worker:',
                      id
                    )
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}