import React, { useState } from 'react';
import styles from './FaqSection.module.css';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: 'How long does it take to find work?',
    answer:
      'Many workers get their first job within 24–48 hours of creating a profile. Urgent jobs are filled within hours. Having a complete profile with skills and a clear bio speeds things up significantly.',
  },
  {
    id: 2,
    question: 'How and when do I get paid?',
    answer:
      'Payment is released automatically when the employer marks the job complete. Funds typically arrive in your bank within 1–2 business days depending on your bank.',
  },
  {
    id: 3,
    question: 'Is WorkMatch free for workers?',
    answer:
      'Yes, completely free. Workers pay no fees, no subscriptions, and no commissions. The pay you see on a job listing is what you\'ll receive.',
  },
  {
    id: 4,
    question: 'How do I verify my identity?',
    answer:
      'You\'ll be asked to verify your identity when you reach a certain earnings threshold or when employers request it. It\'s a quick photo ID check that takes about 2 minutes.',
  },
  {
    id: 5,
    question: "What if an employer doesn't show up or cancels last minute?",
    answer:
      'If an employer cancels within 4 hours of the job start time, you\'ll receive a cancellation fee. Our support team is available 7 days a week if you run into any issues.',
  },
  {
    id: 6,
    question: 'Can I work for multiple employers?',
    answer:
      'Absolutely. Many workers have 3–5 regular employers they work with across different job types. Your profile stays active and available to all of them.',
  },
  {
    id: 7,
    question: 'How does the employer background check work?',
    answer:
      'All employers are identity-verified before posting. We check business registration details and review their hiring history on the platform. Verified employers are marked with a ✓ badge.',
  },
];

export const FaqSection: React.FC = () => {
  // Guardamos el ID de la pregunta abierta (o null si ninguna está abierta)
  // O podemos usar un Set/Array si permitimos múltiples abiertas a la vez.
  const [openIds, setOpenIds] = useState<number[]>([]); // Abrimos las primeras 3 por defecto como en tu captura

  const toggleFaq = (id: number) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        {/* Encabezado */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark mb-2" style={{ fontSize: '2.25rem' }}>
            Frequently asked questions
          </h2>
          <p className="text-muted fs-6 mb-0">
            Everything you need to know before you start.
          </p>
        </div>

        {/* Lista de Acordeones */}
        <div className="mx-auto" style={{ maxWidth: '720px' }}>
          {faqData.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div key={item.id} className={styles.faqItem}>
                <button
                  type="button"
                  className={`w-100 d-flex align-items-center justify-content-between py-3 border-0 bg-transparent text-start ${styles.questionBtn}`}
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className={`fw-semibold ${styles.questionText}`}>
                    {item.question}
                  </span>
                  <span className={`${styles.icon} ${isOpen ? styles.iconActive : ''}`}>
                    {isOpen ? '✕' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className={`pb-3 ${styles.answerWrapper}`}>
                    <p className={`mb-0 ${styles.answerText}`}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};