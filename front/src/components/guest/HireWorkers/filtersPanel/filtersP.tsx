import { useState } from 'react';
import styles from './filtersP.module.css';

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

type FiltersPanelProps = {
  category: string;
  onCategoryChange: (category: string) => void;
  maxRate: string;
  onMaxRateChange: (value: string) => void;
  verifiedOnly: boolean;
  onVerifiedOnlyChange: (value: boolean) => void;
  onClearAll: () => void;
};

export default function FiltersPanel({
  category,
  onCategoryChange,
  maxRate,
  onMaxRateChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  onClearAll,
}: FiltersPanelProps) {
    const [categoryOpen, setCategoryOpen] = useState(false);

    return (
        <div className={styles['filters-panel']}>

            <div className={styles['filter-group']}>
                <label className={styles['filter-label']}>Category</label>

                <div className={styles['category-dropdown']}>
                    <button
                    type="button"
                    className={styles['category-button']}
                    onClick={() => setCategoryOpen((prev) => !prev)}
                    >
                    {category}
                    <span className={styles['category-chevron']}>▾</span>
                    </button>

                    {categoryOpen && (
                    <ul className={styles['category-menu']}>
                        {CATEGORIES.map((cat) => (
                        <li key={cat}>
                            <button
                            type="button"
                            onClick={() => {
                                onCategoryChange(cat);
                                setCategoryOpen(false);
                            }}
                            >
                            {cat}
                            </button>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>

            <div className={styles['filter-group']}>
                <label className={styles['filter-label']}>Max rate ($/hr)</label>
                <input
                type="number"
                placeholder="e.g. 30"
                className={styles['rate-input']}
                value={maxRate}
                onChange={(e) => onMaxRateChange(e.target.value)}
                />
            </div>

            <div className={styles['filter-actions']}>
                <label className={styles['verified-checkbox']}>
                <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => onVerifiedOnlyChange(e.target.checked)}
                />
                Verified only
                </label>

                <button className={styles['clear-all']} onClick={onClearAll}>
                Clear all
                </button>
            </div>

        </div>
    );
}