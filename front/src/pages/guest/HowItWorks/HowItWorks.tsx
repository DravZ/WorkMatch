import React, { useState } from 'react';
import styles from './HowItWorks.module.css';
import { ModeToggle, type ActiveMode } from '../../../components/guest/HowItWorks/ModeToggle/ModeToggle';
import { WorkStepsTimeline } from '../../../components/guest/HowItWorks/WorkStepsTimeline/WorkStepsTimeline';
import { HireStepsTimeline } from '../../../components/guest/HowItWorks/HireStepsTimeline/HireStepsTimeline';
import { FaqSection } from '../../../components/guest/HowItWorks/FaqSection/FaqSection';
import { Footer } from '../../../components/guest/Dashboard/Footer/Footer';

export default function HowItWorks() {
  const [activeMode, setActiveMode] = useState<ActiveMode>('work');

  return (
    <div className={`min-vh-100 ${styles.pageWrapper}`}>

      {/* Hero Section */}
      <section className={`py-5 text-center text-white ${styles.heroDark}`}>
        <div className="container py-4">
          <div className="mb-4">
            <span className={`badge rounded-pill fw-semibold px-3 py-2 ${styles.topBadge}`}>
              HOW IT WORKS
            </span>
          </div>

          <h1 className={`fw-extrabold mb-3 mx-auto ${styles.mainTitle}`}>
            Simple, fast, and designed<br />
            for real work
          </h1>

          <p className="text-secondary fs-6 mb-5 mx-auto" style={{ maxWidth: '580px', color: '#94a3b8' }}>
            WorkMatch connects local workers and employers in minutes. No middlemen, no hidden fees, no waiting around.
          </p>

          <ModeToggle activeMode={activeMode} onModeChange={setActiveMode} />
        </div>
      </section>

      {/* Timeline Steps Section */}
      <section className="py-5 bg-white text-center">
        <div className="container py-4">
          {activeMode === 'work' ? (
            <div className="animate-fade">
              <h2 className="fw-bold text-dark mb-2" style={{ fontSize: '2.25rem' }}>
                Land your first job in 7 steps
              </h2>
              <p className="text-muted fs-6 mb-4">
                From sign up to getting paid — here's exactly how it works.
              </p>
              <WorkStepsTimeline />
            </div>
          ) : (
            <div className="animate-fade">
              <h2 className="fw-bold text-dark mb-2" style={{ fontSize: '2.25rem' }}>
                Hire a worker in 7 steps
              </h2>
              <p className="text-muted fs-6 mb-4">
                Fast, transparent hiring with zero paperwork.
              </p>
              <HireStepsTimeline />
            </div>
          )}
        </div>
      </section>

      {/* FAQs Section */}
      <FaqSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}