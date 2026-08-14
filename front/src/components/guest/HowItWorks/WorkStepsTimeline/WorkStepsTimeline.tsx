import React from 'react';
import { TimelineStep, type TimelineStepProps } from '../TimelineStep/TimelineStep';

const workSteps: Omit<TimelineStepProps, 'stepNumber'>[] = [
  {
    icon: '👤',
    title: 'Create your profile',
    description:
      'Sign up in minutes. Add your skills, experience, availability, and location. No resume required.',
  },
  {
    icon: '🔍',
    title: 'Browse local jobs',
    description:
      'See shifts and gigs near you in real time. Filter by category, pay, date, or distance.',
  },
  {
    icon: '⚡',
    title: 'Apply instantly',
    description:
      'One tap to apply. No cover letter, no waiting weeks. Employers can see your profile and accept quickly.',
  },
  {
    icon: '💬',
    title: 'Chat with the employer',
    description:
      "Once you're accepted, message the employer directly to confirm details, ask questions, or clarify logistics.",
  },
  {
    icon: '🏗️',
    title: 'Show up and work',
    description:
      'Do the job, impress the employer, collect your review. WorkMatch tracks your completed jobs automatically.',
  },
  {
    icon: '💸',
    title: 'Get paid',
    description:
      'Payment is processed as soon as the job is marked complete — directly to your bank. No chasing invoices.',
  },
  {
    icon: '⭐',
    title: 'Build your reputation',
    description:
      'Every completed job and 5-star review boosts your profile. Top workers get invited to jobs directly.',
  },
];

export const WorkStepsTimeline: React.FC = () => {
  return (
    <div className="mx-auto mt-5" style={{ maxWidth: '720px' }}>
      {workSteps.map((step, index) => (
        <TimelineStep
          key={index}
          stepNumber={index + 1}
          icon={step.icon}
          title={step.title}
          description={step.description}
          isLast={index === workSteps.length - 1}
        />
      ))}
    </div>
  );
};