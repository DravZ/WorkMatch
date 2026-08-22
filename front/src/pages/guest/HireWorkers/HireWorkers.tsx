import { useEffect, useMemo, useState } from 'react';
import CardW from '../../../components/guest/HireWorkers/cardWorkers/cardW';
import SearchBar from '../../../components/guest/HireWorkers/searchBar/searchB';
import type { SortOption } from '../../../components/guest/HireWorkers/searchBar/searchB';
import CategoryTabs from '../../../components/guest/HireWorkers/categoryTabs/categoryT';
import FiltersPanel from '../../../components/guest/HireWorkers/filtersPanel/filtersP';
import styles from './HireWorkers.module.css';
import { getTrabajadores } from '../../../../services/trabajador';
import { mapTrabajadorToCard } from '../../../../utils/mapTrabajadorToCard';
import type { Trabajador } from '../../../../types/trabajador';

export default function HireWorkers() {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<SortOption>('mas valorados');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [maxRate, setMaxRate] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTrabajadores()
      .then((data) => { if (active) setTrabajadores(data); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  function handleClearAll() {
    setMaxRate('');
    setVerifiedOnly(false);
    setCategory('All');
  }

  const workers = useMemo(() => trabajadores.map(mapTrabajadorToCard), [trabajadores]);

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const matchesCategory = category === 'All' || worker.areaTrabajo === category;

      const matchesSearch =
        search.trim() === '' ||
        worker.name.toLowerCase().includes(search.toLowerCase()) ||
        worker.profession.toLowerCase().includes(search.toLowerCase()) ||
        worker.location.toLowerCase().includes(search.toLowerCase()) ||
        worker.services.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesRate = maxRate === '' || worker.price <= Number(maxRate);
      const matchesVerified = !verifiedOnly || worker.verified;

      return matchesCategory && matchesSearch && matchesRate && matchesVerified;
    });
  }, [search, category, workers, maxRate, verifiedOnly]);

  const sortedWorkers = useMemo(() => {
    const result = [...filteredWorkers];

    switch (sort) {
      case 'mas valorados':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'precio: menor - mayor':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price: mayor a menor':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mas experimentados':
        result.sort((a, b) => b.jobs - a.jobs);
        break;
    }

    return result;
  }, [filteredWorkers, sort]);

  if (loading) return <main className={styles.page}><p>Cargando...</p></main>;
  if (error) return <main className={styles.page}><p>Error: {error}</p></main>;

  return (
    <main className={styles.page}>
      <div className={styles.headerSection}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <div className={styles.titleGroup}>
              <h1>Find workers</h1>
              <p>{sortedWorkers.length} workers available to hire</p>
            </div>

            <div className={styles.headerActions}>
              <button className={styles.postJobButton} onClick={() => console.log('post a job')}>
                + Post a job
              </button>
              <button className={styles.filtersButton} onClick={() => setFiltersOpen((prev) => !prev)}>
                ⚙ Filters
              </button>
            </div>
          </div>

          <SearchBar onSearchChange={setSearch} onSortChange={setSort} />

          {filtersOpen && (
            <FiltersPanel
              category={category}
              onCategoryChange={setCategory}
              maxRate={maxRate}
              onMaxRateChange={setMaxRate}
              verifiedOnly={verifiedOnly}
              onVerifiedOnlyChange={setVerifiedOnly}
              onClearAll={handleClearAll}
            />
          )}

          <CategoryTabs active={category} onCategoryChange={setCategory} />
        </div>
      </div>

      <section className={styles.resultsSection}>
        <div className={styles.resultsContainer}>
          <div className={styles.grid}>
            {sortedWorkers.map((worker) => (
              <CardW key={worker.id} {...worker} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}