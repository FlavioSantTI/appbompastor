import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { supabase } from '@/integrations/supabase/client';

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

interface Evento {
  id: string;
  titulo: string;
  data_inicio: string;
}

export default function CoupleFormDialog({ open, onClose }: CoupleFormDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedEvento, setSelectedEvento] = useState<string | null>(null);
  const [loadingEventos, setLoadingEventos] = useState(false);
  
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

  useEffect(() => {
    const fetchEventos = async () => {
      setLoadingEventos(true);
      try {
        const { data, error } = await supabase
          .from('eventos')
          .select('id, titulo, data_inicio')
          .order('data_inicio', { ascending: false });
        
        if (error) throw error;
        
        setEventos(data || []);
        
        if (data && data.length > 0) {
          setSelectedEvento(data[0].id);
        }
      } catch (error: any) {
        console.error('Erro ao carregar eventos:', error);
        toast({
          title: "Erro ao carregar eventos",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoadingEventos(false);
      }
    };
    
    fetchEventos();
  }, [toast]);

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
    if (!selectedEvento) {
      toast({
        title: "Evento não selecionado",
        description: "Por favor, selecione um evento para a inscrição.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);

    try {
      // Cadastrar o casal E VINCULAR ao evento selecionado via submitCoupleForm atualizado
      const inscricaoId = await submitCoupleForm(wifeData, husbandData, coupleData, selectedEvento);

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
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Evento <span className="text-red-500">*</span>
          </label>
          <Select
            value={selectedEvento || ''}
            onValueChange={setSelectedEvento}
            disabled={loadingEventos}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um evento" />
            </SelectTrigger>
            <SelectContent>
              {loadingEventos ? (
                <SelectItem value="loading" disabled>Carregando eventos...</SelectItem>
              ) : eventos.length === 0 ? (
                <SelectItem value="none" disabled>Nenhum evento disponível</SelectItem>
              ) : (
                eventos.map((evento) => (
                  <SelectItem key={evento.id} value={evento.id}>
                    {evento.titulo} ({new Date(evento.data_inicio).toLocaleDateString('pt-BR')})
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        
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
            canSubmit={termsAccepted && !!selectedEvento}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
