import React from 'react';
import { MetricCard, type MetricCardProps } from '../MetricCard/MetricCard';
import { FeatureItem, type FeatureItemProps } from '../FeatureItem/FeatureItem';
const features: FeatureItemProps[] = [
  {
    icon: '🛡️',
    title: 'Identity verified',
    description: 'Every user completes ID verification before their first job.',
  },
  {
    icon: '⭐',
    title: 'Mutual reviews',
    description: 'Workers and employers review each other after every job.',
  },
  {
    icon: '💸',
    title: 'Payment protection',
    description: 'Payments confirmed through WorkMatch — always protected.',
  },
];

const metrics: MetricCardProps[] = [
  { value: '4.8★', label: 'Avg. employer rating', subtext: 'From 14k+ reviews' },
  { value: '4.7★', label: 'Avg. worker rating', subtext: 'From 21k+ reviews' },
  { value: '94%', label: 'Jobs filled on time', subtext: 'Last 90 days' },
  { value: '< 2h', label: 'Time to first applicant', subtext: 'Avg. after posting' },
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-5 my-4">
      <div className="row gy-5 align-items-center">
        
        {/* Lado Izquierdo: Título y Lista de Características */}
        <div className="col-lg-6 pe-lg-5">
          <h2 className="fw-extrabold text-dark mb-3" style={{ fontSize: '2.25rem', letterSpacing: '-0.02em' }}>
            Every profile is real.<br />
            Every review is honest.
          </h2>
          <p className="text-secondary mb-4 fs-6" style={{ color: '#64748b', maxWidth: '480px' }}>
            WorkMatch is built on verification, transparency, and mutual accountability. No ghost jobs. No fake profiles.
          </p>

          <div className="d-flex flex-column gap-4">
            {features.map((item, index) => (
              <FeatureItem key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Lado Derecho: Grid 2x2 de Métricas */}
        <div className="col-lg-6">
          <div className="row g-3">
            {metrics.map((metric, index) => (
              <div className="col-6" key={index}>
                <MetricCard {...metric} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};