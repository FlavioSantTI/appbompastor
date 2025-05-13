
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  canSubmit: boolean;
  submitLabel?: string; // Adicionando suporte para label personalizado
}

const FormNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
  canSubmit,
  submitLabel = "Finalizar Inscrição" // Valor padrão para manter compatibilidade
}: FormNavigationProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between mt-8">
      <Button
        type="button"
        variant="outline"
        className={`${isFirstStep ? 'invisible' : ''}`}
        onClick={onPrevious}
        disabled={isSubmitting}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Anterior
      </Button>

      {isLastStep ? (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || !canSubmit}
          className="ml-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onNext}
          className="ml-auto"
        >
          Próximo
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
