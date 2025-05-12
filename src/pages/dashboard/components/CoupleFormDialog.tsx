
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Stepper from '@/features/form/components/Stepper';
import WifeForm from '@/features/form/components/WifeForm';
import HusbandForm from '@/features/form/components/HusbandForm';
import CoupleForm from '@/features/form/components/CoupleForm';
import ReviewForm from '@/features/form/components/ReviewForm';
import FormNavigation from '@/features/form/components/FormNavigation';
import { FORM_SECTIONS } from '@/core/constants';
import { useCoupleFormState } from '@/features/form/hooks/useCoupleFormState';
import { validateWifeData, validateHusbandData, validateCoupleData } from '@/features/form/utils/formValidation';
import { submitCoupleForm } from '@/features/form/services/coupleFormService';

interface CoupleFormDialogProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, name: FORM_SECTIONS.WIFE },
  { id: 2, name: FORM_SECTIONS.HUSBAND },
  { id: 3, name: FORM_SECTIONS.COUPLE },
  { id: 4, name: FORM_SECTIONS.REVIEW },
];

export default function CoupleFormDialog({ open, onClose }: CoupleFormDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    currentStep,
    setCurrentStep,
    wifeData,
    setWifeData,
    husbandData,
    setHusbandData,
    coupleData,
    setCoupleData,
    termsAccepted,
    setTermsAccepted,
    resetForm
  } = useCoupleFormState();

  const nextStep = () => {
    let canContinue = false;
    
    if (currentStep === 1) {
      canContinue = validateWifeData(wifeData);
      if (!canContinue) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos obrigatórios da esposa corretamente.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      canContinue = validateHusbandData(husbandData);
      if (!canContinue) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos obrigatórios do esposo corretamente.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 3) {
      canContinue = validateCoupleData(coupleData);
      if (!canContinue) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos obrigatórios do casal corretamente.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!termsAccepted) {
      toast({
        title: "Termos não aceitos",
        description: "Por favor, aceite os termos para finalizar a inscrição.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      await submitCoupleForm(wifeData, husbandData, coupleData);
      
      toast({
        title: "Inscrição realizada com sucesso!",
        description: `A inscrição do casal foi cadastrada com sucesso.`
      });
      
      // Atualizar a lista de casais
      queryClient.invalidateQueries({ queryKey: ['couples'] });
      
      handleClose();
    } catch (error: any) {
      console.error('Erro ao cadastrar casal:', error);
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Ocorreu um erro ao cadastrar o casal.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <WifeForm data={wifeData} onChange={setWifeData} />;
      case 2:
        return <HusbandForm data={husbandData} onChange={setHusbandData} />;
      case 3:
        return <CoupleForm data={coupleData} onChange={setCoupleData} />;
      case 4:
        return (
          <ReviewForm
            wifeData={wifeData}
            husbandData={husbandData}
            coupleData={coupleData}
            termsAccepted={termsAccepted}
            onAcceptTerms={setTermsAccepted}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-950 border border-blue-100 dark:border-blue-900">
        <DialogHeader>
          <DialogTitle className="text-2xl text-blue-800 dark:text-blue-300">Formulário de Inscrição</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Stepper steps={steps} currentStep={currentStep} />
          
          <div className="mt-6">
            {renderStepContent()}
          </div>
          
          <FormNavigation 
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={prevStep}
            onNext={nextStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            canSubmit={termsAccepted}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
