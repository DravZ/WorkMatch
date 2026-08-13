import React, { useState } from 'react';
import { JobCard } from '../../../components/guest/FindWork/temp';
import styles from './FindWork.module.css';

const CATEGORIES = ['All', 'Delivery', 'Events', 'Cleaning', 'Hospitality', 'Moving', 'Security'];

const MOCK_JOBS = [
  { id: 1, status: 'Open', title: 'Warehouse Picker & Packer', category: 'DELIVERY', companyName: 'Metro Logistics Co.', companyLogoText: 'ML', verifiedText: 'Verified', payRate: 22 },
  { id: 2, status: 'Open', title: 'House Moving Crew Member', category: 'MOVING', companyName: 'Swift Move NYC', companyLogoText: 'SM', verifiedText: 'Verified', payRate: 28 },
];

export default function FindWork() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={styles.jobSearchContainer}>
      <div className={styles.jobSearchHeader}>
        <div>
          <h1>Find work nearby</h1>
          <p>6 jobs available right now</p>
        </div>
        <button className={styles.filtersBtn}>⚙ Filters</button>
      </div>

      <div className={styles.searchFiltersGrid}>
        <div className={styles.searchInputWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Job title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.selectWrapper}>
          <select>
            <option>Newest first</option>
            <option>Highest pay</option>
            <option>Lowest pay</option>
          </select>
          <span className={styles.selectArrow}>▼</span>
        </div>
      </div>

      <div className={styles.categoriesScroll}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`${styles.categoryPill} ${activeCategory === cat ? styles.active : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.jobsGrid}>
        {MOCK_JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}