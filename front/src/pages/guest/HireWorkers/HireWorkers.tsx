import { useMemo, useState } from 'react';
import CardW from '../../../components/guest/HireWorkers/cardWorkers/cardW';
import SearchBar from '../../../components/guest/HireWorkers/searchBar/searchB';
import CategoryTabs from '../../../components/guest/HireWorkers/categoryTabs/categoryT';
import styles from './HireWorkers.module.css';

const WORKERS = [
  {
    id: 1,
    name: 'Aisha Johnson',
    initials: 'AJ',
    profession: 'Professional Cleaner & Organizer',
    verified: true,
    price: 24,
    rating: 5,
    reviews: 19,
    jobs: 21,
    location: 'Harlem, NY',
    available: true,
    category: 'Cleaning',
    services: ['Deep cleaning', 'Airbnb turnover', 'Laundry', 'Windows', 'Organization'],
  },
  {
    id: 2,
    name: 'Marcus Thompson',
    initials: 'MT',
    profession: 'General Laborer & Warehouse',
    verified: true,
    price: 22,
    rating: 4.9,
    reviews: 47,
    jobs: 52,
    location: 'Brooklyn, NY',
    available: true,
    category: 'Moving',
    services: ['Forklift certified', 'Inventory management', 'Heavy lifting', 'Loading', 'Packing'],
  },
  {
    id: 3,
    name: 'Elena Petrov',
    initials: 'EP',
    profession: 'Administrative & Data Entry',
    verified: false,
    price: 28,
    rating: 4.9,
    reviews: 11,
    jobs: 12,
    location: 'Astoria, NY',
    available: false,
    category: 'Administrative',
    services: ['Excel', 'Data entry', 'Scheduling', 'Filing', 'Reports'],
  },
];

export default function HireWorkers() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredWorkers = useMemo(() => {
    return WORKERS.filter((worker) => {
      const matchesCategory = category === 'All' || worker.category === category;
      const matchesSearch =
        search.trim() === '' ||
        worker.name.toLowerCase().includes(search.toLowerCase()) ||
        worker.profession.toLowerCase().includes(search.toLowerCase()) ||
        worker.location.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <main className={styles.page}>

      <div className={styles.headerSection}>
        <div className={styles.header}>

          <div className={styles.titleRow}>
            <div className={styles.titleGroup}>
              <h1>Find workers</h1>
              <p>{filteredWorkers.length} workers available to hire</p>
            </div>

            <div className={styles.headerActions}>
              <button className={styles.postJobButton} onClick={() => console.log('post a job')}>
                + Post a job
              </button>
              <button className={styles.filtersButton} onClick={() => console.log('open filters')}>
                ⚙ Filters
              </button>
            </div>
          </div>

          <SearchBar
            onSearchChange={setSearch}
            onSortChange={(sort) => console.log('sort:', sort)}
          />

          <CategoryTabs onCategoryChange={setCategory} />

        </div>
      </div>

      <section className={styles.resultsSection}>
        <div className={styles.resultsContainer}>
          <div className={styles.grid}>
            {filteredWorkers.map((worker) => (
              <CardW key={worker.id} {...worker} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}