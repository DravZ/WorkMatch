import React from 'react';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

const stepLabels: Record<number, string> = {
  1: 'Step 1 of 4: Basic information',
  2: 'Step 2 of 4: Pay & location',
  3: 'Step 3 of 4: Schedule & capacity',
  4: 'Step 4 of 4: Requirements',
};

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  totalSteps = 4,
}) => {
  return (
    <div className="w-100 max-w-2xl mx-auto mb-4">
      <div className="d-flex gap-2 mb-2">
        {Array.from({ length: totalSteps }, (_, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum <= currentStep;
          return (
            <div
              key={stepNum}
              className="flex-grow-1 rounded-pill"
              style={{
                height: '4px',
                backgroundColor: isActive ? '#0b9982' : '#e2e8f0',
                transition: 'background-color 0.3s ease',
              }}
            />
          );
        })}
      </div>
      <span className="text-muted extra-small fw-medium">
        {stepLabels[currentStep]}
      </span>
    </div>
  );
};