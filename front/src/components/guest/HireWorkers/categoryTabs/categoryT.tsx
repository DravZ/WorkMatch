import { useState } from 'react';
import styles from './categoryT.module.css';

const CATEGORIES = [
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

type CategoryTabsProps = {
  onCategoryChange: (category: string) => void;
};

export default function CategoryTabs({ onCategoryChange }: CategoryTabsProps) {
  const [active, setActive] = useState('All');

  function handleSelect(category: string) {
    setActive(category);
    onCategoryChange(category);
  }

  return (
    <div className={styles['tabs-wrapper']}>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          className={`${styles['tab']} ${active === category ? styles['active'] : ''}`}
          onClick={() => handleSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}