import React from 'react';
import styles from './StepsSection.module.css';
import { StepItem, type StepItemProps } from '../StepItem/StepItem';

const stepsData: StepItemProps[] = [
  {
    stepNumber: '01',
    title: 'Create your profile',
    description:
      'Sign up in minutes. Add skills, availability, and work history. One profile works for finding work and hiring.',
  },
  {
    stepNumber: '02',
    title: 'Match instantly',
    description:
      'Browse jobs that fit your schedule. Apply with one click — your WorkMatch profile is your résumé.',
  },
  {
    stepNumber: '03',
    title: 'Work and get paid',
    description:
      'Show up, do great work, build your reputation. Payments are confirmed through WorkMatch.',
  },
];

export const StepsSection: React.FC = () => {
  return (
    <section className={`py-5 px-4 px-md-5 ${styles.darkWrapper}`}>
      <div className="container py-4">
        
        {/* Encabezado */}
        <div className="mb-5">
          <h2 className="fw-bold text-white mb-2" style={{ fontSize: '2.25rem' }}>
            From search to hired — in minutes
          </h2>
          <p className="text-secondary fs-6 mb-0" style={{ color: '#94a3b8' }}>
            Three steps between you and your next gig.
          </p>
        </div>

        {/* Grid de Pasos */}
        <div className="row g-4 g-lg-5 mb-5">
          {stepsData.map((step, index) => (
            <div className="col-12 col-md-4" key={index}>
              <StepItem {...step} />
            </div>
          ))}
        </div>

        {/* Botones de Acción (CTAs) */}
        <div className="d-flex flex-wrap gap-3 align-items-center pt-2">
          <button className={`btn fw-semibold px-4 py-2 ${styles.btnPrimary}`}>
            Find work — free
          </button>
          <button className={`btn fw-semibold px-4 py-2 ${styles.btnOutline}`}>
            Hire workers
          </button>
        </div>

      </div>
    </section>
  );
};