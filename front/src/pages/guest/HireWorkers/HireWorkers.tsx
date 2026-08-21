import { useEffect, useMemo, useState } from 'react';
import CardW from '../../../components/guest/HireWorkers/cardWorkers/cardW';
import SearchBar from '../../../components/guest/HireWorkers/searchBar/searchB';
import CategoryTabs from '../../../components/guest/HireWorkers/categoryTabs/categoryT';
import FiltersPanel from '../../../components/guest/HireWorkers/filtersPanel/filtersP';
import styles from './HireWorkers.module.css';
import { getUsuarios } from '../../../../services/usuarios';
import { mapUsuarioToCard } from '../../../../utils/mapUsuarioToCard';
import type { Usuario } from '../../../../types/usuario';

export default function HireWorkers() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [maxRate, setMaxRate] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    let active = true;
    setLoading(true);
    getUsuarios()
      .then((data) => { if (active) setUsuarios(data); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  function handleClearAll() {
    setMaxRate('');
    setVerifiedOnly(false);
    setFilterCategory('All');
  }

  const workers = useMemo(() => usuarios.map(mapUsuarioToCard), [usuarios]);

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      // Categorías: no existen en el backend (ni etiquetas de habilidades ni
      // historial laboral en Usuario). CategoryTabs se mantiene visualmente
      // pero no filtra nada hasta que exista ese campo.
      const matchesCategory = true;

      // Solo se filtra por lo único real: el nombre.
      const matchesSearch =
        search.trim() === '' || worker.name.toLowerCase().includes(search.toLowerCase());

      // maxRate y verifiedOnly: sin respaldo (no hay tarifa ni verificación
      // en Usuario). Se mantienen inertes.
      const matchesRate = true;
      const matchesVerified = true;

      return matchesCategory && matchesSearch && matchesRate && matchesVerified;
    });
  }, [search, workers]);

  if (loading) return <main className={styles.page}><p>Cargando...</p></main>;
  if (error) return <main className={styles.page}><p>Error: {error}</p></main>;

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
              <button className={styles.filtersButton} onClick={() => setFiltersOpen((prev) => !prev)}>
                ⚙ Filters
              </button>
            </div>
          </div>

          {/* onSortChange no ordena realmente: no hay rating ni price reales que ordenar */}
          <SearchBar onSearchChange={setSearch} onSortChange={(sort) => console.log('sort (sin efecto, sin datos de respaldo):', sort)} />

          {filtersOpen && (
            <FiltersPanel
              category={filterCategory}
              onCategoryChange={setFilterCategory}
              maxRate={maxRate}
              onMaxRateChange={setMaxRate}
              verifiedOnly={verifiedOnly}
              onVerifiedOnlyChange={setVerifiedOnly}
              onClearAll={handleClearAll}
            />
          )}

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