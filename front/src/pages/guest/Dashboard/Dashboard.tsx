import React from 'react';
import styles from './Dashboard.module.css';
import { JobCard, type JobCardProps } from '../../../components/guest/Dashboard/JobCard/JobCard';
import { Badge } from '../../../components/guest/Dashboard/Badge/Badge';
import { StatCard } from '../../../components/guest/Dashboard/StatCard/StatCard';
import { CategorySection } from '../../../components/guest/Dashboard/CategorySection/CategorySection';
import { StepsSection } from '../../../components/guest/Dashboard/StepsSection/StepsSection';
import { Footer } from '../../../components/guest/Dashboard/Footer/Footer';
import { TrustSection } from '../../../components/guest/Dashboard/TrsutSection/TrustSection';
import { Navbar } from '../../../components/guest/shared/Navbar/Navbar';


const jobListings: JobCardProps[] = [
  {
    title: 'Warehouse Picker & Packer',
    company: 'Metro Logistics Co.',
    location: 'Brooklyn, NY',
    schedule: 'Mon–Fri, 7am–3pm',
    payRate: '$22/hr',
  },
  {
    title: 'Event Setup Crew',
    company: 'Prestige Events Group',
    location: 'Manhattan, NY',
    schedule: 'Sat, 6am–2pm',
    payRate: '$25/hr',
    isUrgent: true,
  },
  {
    title: 'Office Deep Clean',
    company: 'Stark Financial Group',
    location: 'Midtown, NY',
    schedule: 'Sun, 8am–12pm',
    payRate: '$320',
  },
];

const trendingTags = ['Warehouse', 'Events', 'Cleaning', 'Moving', 'Kitchen'];

export default function Dashboard() {
  return (
    <div className={`min-vh-100 ${styles.heroSection}`}>
      <main className="py-5">
        <div className="container">
          
          {/* SECCIÓN 1: HERO & JOBCARDS */}
          <div className="row gy-5 align-items-center mb-5">
            {/* Lado Izquierdo: Título y Buscador */}
            <div className="col-lg-7 pe-lg-5">
              <div className={`d-inline-flex align-items-center gap-2 px-3 py-1 mb-4 ${styles.topBadge}`}>
                <span className={`badge rounded-pill ${styles.badgeNew}`}>NEW</span>
                <span className="small fw-medium">Instant matching in 60+ categories</span>
              </div>

              <h1 className={`fw-extrabold mb-4 ${styles.mainTitle}`}>
                Find work.<br />
                Hire people.<br />
                <span className={styles.accentText}>Get it done.</span>
              </h1>

              <p className="text-secondary fs-5 mb-4 lh-base" style={{ maxWidth: '520px' }}>
                WorkMatch connects skilled people with local employers who need help now — not in two weeks. Apply in minutes, get hired today.
              </p>

              <div className={`p-4 mb-5 ${styles.searchBox}`}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className={`form-label ${styles.inputLabel}`}>WHAT</label>
                      <input
                        type="text"
                        className={`form-control ${styles.searchInput}`}
                        placeholder="Job title or skill"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className={`form-label ${styles.inputLabel}`}>WHERE</label>
                      <input
                        type="text"
                        className={`form-control ${styles.searchInput}`}
                        placeholder="City or zip code"
                      />
                    </div>
                  </div>

                  <button type="submit" className={`btn w-100 py-3 fw-semibold ${styles.searchBtn}`}>
                    Search jobs
                  </button>
                </form>

                <div className="d-flex align-items-center flex-wrap gap-1 mt-4">
                  <span className="text-muted me-2 small">Trending:</span>
                  {trendingTags.map((tag) => (
                    <Badge key={tag} label={tag} />
                  ))}
                </div>
              </div>

              <div className="row g-4">
                <div className="col-4">
                  <StatCard number="14,800+" label="Active workers" />
                </div>
                <div className="col-4">
                  <StatCard number="3,100+" label="Employers" />
                </div>
                <div className="col-4">
                  <StatCard number="21,000+" label="Jobs completed" />
                </div>
              </div>
            </div>

            {/* Lado Derecho: Tarjetas de Empleo */}
            <div className="col-lg-5 ps-lg-4">
              <div className="d-flex flex-column gap-2">
                {jobListings.map((job, index) => (
                  <JobCard key={index} {...job} />
                ))}

                <button className={`btn w-100 py-3 mt-2 fw-semibold ${styles.browseBtn}`}>
                  Browse all jobs →
                </button>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: CATEGORÍAS */}
          <CategorySection />

          {/* SECCIÓN 3: PASOS (HOW IT WORKS) */}
          <div className="mt-5">
            <StepsSection />
          </div>

          {/* SECCIÓN 4: CONFIANZA Y MÉTRICAS */}
          <TrustSection />

        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}