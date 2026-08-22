import React from 'react';
import { TimelineStep, type TimelineStepProps } from '../TimelineStep/TimelineStep';

const hireSteps: Omit<TimelineStepProps, 'stepNumber'>[] = [
  {
    icon: '🏢',
    title: 'Post a job in minutes',
    description:
      'Describe the role, set the pay rate, date, and location. Specify any required skills or certifications.',
  },
  {
    icon: '👥',
    title: 'Review applicants',
    description:
      'Browse local worker profiles, ratings, past job reviews, and verified skill badges in real time.',
  },
  {
    icon: '✅',
    title: 'Accept & confirm',
    description:
      'Select the right worker for your shift with a single click. Instant confirmation sent to both parties.',
  },
  {
    icon: '💬',
    title: 'Coordinate details',
    description:
      'Use built-in direct messaging to share arrival instructions, parking details, or answer questions.',
  },
  {
    icon: '📋',
    title: 'Manage the shift',
    description:
      'Track worker check-ins automatically and ensure smooth operations throughout the work day.',
  },
  {
    icon: '💳',
    title: 'Automated payment',
    description:
      'Approve hours worked and payment is automatically processed securely through the platform.',
  },
  {
    icon: '⭐',
    title: 'Rate & re-hire',
    description:
      'Leave a 5-star review and save your favorite workers to your private roster for quick future hiring.',
  },
];

export const HireStepsTimeline: React.FC = () => {
  return (
    <div className="mx-auto mt-5" style={{ maxWidth: '720px' }}>
      {hireSteps.map((step, index) => (
        <TimelineStep
          key={index}
          stepNumber={index + 1}
          icon={step.icon}
          title={step.title}
          description={step.description}
          isLast={index === hireSteps.length - 1}
        />
      ))}
    </div>
  );
};