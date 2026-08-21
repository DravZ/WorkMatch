import { useState } from 'react';
import styles from './cardW.module.css';

type CardWProps = {
  name: string;
  initials: string;
  profession: string;
  verified: boolean;
  price: number;
  rating: number;
  reviews: number;
  jobs: number;
  location: string;
  available: boolean;
  services: string[];
};

export default function CardW({
  name,
  initials,
  profession,
  verified,
  price,
  rating,
  reviews,
  jobs,
  location,
  available,
  services,
}: CardWProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={styles['cleaner-card-wrapper']}>
      <div className={styles['cleaner-card']}>

        {/* Encabezado */}
        <div className={styles['cleaner-header']}>

          <div className={styles['avatar']}>
            {initials}
          </div>

          <div className={styles['cleaner-info']}>
            <div className={styles['cleaner-name']}>
              <h2>{name}</h2>
              {verified && (
                <span className={styles['verified']}>✓</span>
              )}
            </div>

            <p>{profession}</p>
          </div>

          <div className={styles['price']}>
            <strong>${price}</strong>
            <span>/ hora</span>
          </div>

        </div>

        {/* Rating */}
        <div className={styles['cleaner-stats']}>

          <span className={styles['rating-group']}>
            <span className={styles['star']}>★</span>
            <strong>{rating}</strong>
            <span className={styles['reviews']}>({reviews})</span>
          </span>

          <span className={styles['jobs']}>
            ✓ {jobs} jobs
          </span>

          <button
            className={`${styles['favorite']} ${isFavorite ? styles['favorite-active'] : ''}`}
            aria-label="Add to favorites"
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite((prev) => !prev)}
          >
            {isFavorite ? '♥' : '♡'}
          </button>

        </div>

        {/* Ubicación */}
        <div className={styles['location']}>

          <span>📍</span>
          <span>{location}</span>

          {available && (
            <span className={styles['availability']}>
              <span className={styles['lightning']}>ϟ</span>
              <span>Available now</span>
            </span>
          )}

        </div>

        {/* Servicios */}
        <div className={styles['services']}>

          {services.slice(0, 3).map((service, index) => (
            <span className={styles['service']} key={index}>
              {service}
            </span>
          ))}

          {services.length > 3 && (
            <span className={`${styles['service']} ${styles['more']}`}>
              +{services.length - 3}
            </span>
          )}

        </div>

        {/* Separador */}
        <div className={styles['divider-wrapper']}>
          <div className={styles['divider']} />
        </div>

        {/* Botones */}
        <div className={styles['actions']}>

          <button className={styles['profile-button']}>
            View profile
          </button>

          <button className={styles['invite-button']}>
            Invite to job
          </button>

        </div>

      </div>
    </div>
  );
}