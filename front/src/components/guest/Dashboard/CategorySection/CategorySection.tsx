import React from 'react';
import { CategoryCard, type CategoryCardProps } from '../CardCategory/CategoryCard';

const categories: CategoryCardProps[] = [
  { icon: '🏗️', title: 'Construction', openCount: 234 },
  { icon: '🧹', title: 'Cleaning', openCount: 156 },
  { icon: '📦', title: 'Delivery & Logistics', openCount: 189 },
  { icon: '🍽️', title: 'Hospitality', openCount: 312 },
  { icon: '🎪', title: 'Events', openCount: 98 },
  { icon: '🚚', title: 'Moving', openCount: 67 },
  { icon: '🌿', title: 'Landscaping', openCount: 143 },
  { icon: '🛡️', title: 'Security', openCount: 89 },
  { icon: '📋', title: 'Administrative', openCount: 201 },
  { icon: '💻', title: 'Tech Support', openCount: 115 },
];

export const CategorySection: React.FC = () => {
  return (
    <section className="py-5">
      {/* Título de la Sección */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1" style={{ fontSize: '2rem' }}>
          Browse by category
        </h2>
        <p className="text-muted mb-0">60+ job types, updated daily.</p>
      </div>

      {/* Grid Responsivo de Categorías */}
      <div className="row g-3 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-7">
        {categories.map((cat, index) => (
          <div className="col" key={index}>
            <CategoryCard {...cat} />
          </div>
        ))}
      </div>
    </section>
  );
};