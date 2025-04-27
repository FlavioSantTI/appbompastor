
import React from 'react';
import { Check } from 'lucide-react';

interface StepItem {
  id: number;
  name: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center items-center py-4 overflow-x-auto">
      <div className="flex items-center">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`step-item ${currentStep === step.id ? 'active' : ''} ${
              currentStep > step.id ? 'complete' : ''
            }`}
          >
            <div className={`step ${currentStep === step.id ? 'active' : ''} ${
              currentStep > step.id ? 'complete' : ''
            }`}>
              {currentStep > step.id ? (
                <Check size={20} className="complete-icon" />
              ) : (
                step.id
              )}
            </div>
            <p className="text-center mt-2 text-xs sm:text-sm">{step.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
