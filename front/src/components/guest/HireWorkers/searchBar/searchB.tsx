import { useState } from 'react';
import styles from './searchB.module.css';

type SortOption = 'mas valorados' | 'precio: menor - mayor' | 'price: mayor a menor' | 'mas experimentados';

type SearchBarProps = {
  onSearchChange: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
};

const SORT_LABELS: Record<SortOption, string> = {
  'mas valorados': 'Más valorados',
  'mas experimentados': 'Más experimentados',
  'precio: menor - mayor': 'Precio: de Bajo a Alto',
  'price: mayor a menor': 'Price: High to Low',
};

export default function SearchBar({
  onSearchChange,
  onSortChange,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>('mas valorados');

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    onSearchChange(e.target.value);
  }

  function handleSortSelect(option: SortOption) {
    setSort(option);
    onSortChange(option);
    setSortOpen(false);
  }

  return (
    <div className={styles['search-row']}>
      <div className={styles['search-input-wrapper']}>
        <span className={styles['search-icon']}>🔍</span>
        <input
          type="text"
          placeholder="Name, skill, or location..."
          value={query}
          onChange={handleQueryChange}
          className={styles['search-input']}
        />
      </div>

      <div className={styles['sort-dropdown']}>
        <button
          className={styles['sort-button']}
          onClick={() => setSortOpen((prev) => !prev)}
        >
          {SORT_LABELS[sort]}
          <span className={styles['chevron']}>▾</span>
        </button>

        {sortOpen && (
          <ul className={styles['sort-menu']}>
            {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
              <li key={option}>
                <button onClick={() => handleSortSelect(option)}>
                  {SORT_LABELS[option]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}