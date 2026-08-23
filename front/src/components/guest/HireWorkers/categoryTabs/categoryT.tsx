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
  active: string;
  onCategoryChange: (category: string) => void;
};

export default function CategoryTabs({ active, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className={styles['tabs-wrapper']}>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`${styles['tab']} ${active === cat ? styles['active'] : ''}`}
          onClick={() => onCategoryChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}