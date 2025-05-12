
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  canSubmit: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
  canSubmit
}) => {
  return (
    <div className="mt-8 flex justify-between">
      <Button
        type="button"
        onClick={onPrevious}
        variant="outline"
        className={`border-blue-200 hover:bg-blue-50 text-blue-700 ${currentStep === 1 ? 'invisible' : ''}`}
        disabled={isSubmitting}
      >
        Anterior
      </Button>
      
      {currentStep < totalSteps ? (
        <Button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Próximo
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || !canSubmit}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Inscrição'}
          {!isSubmitting && <Check className="h-4 w-4" />}
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
