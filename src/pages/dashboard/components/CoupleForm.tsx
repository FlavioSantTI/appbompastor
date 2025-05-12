import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Stepper from '@/features/form/components/Stepper';
import WifeForm, { WifeData } from '@/features/form/components/WifeForm';
import HusbandForm, { HusbandData } from '@/features/form/components/HusbandForm';
import CoupleForm, { CoupleData } from '@/features/form/components/CoupleForm';
import ReviewForm from '@/features/form/components/ReviewForm';
import { FORM_SECTIONS } from '@/core/constants';
import { validateRequired, validateEmail, validatePhone } from '@/core/validation';
import { Check } from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [wifeData, setWifeData] = useState<WifeData>({
    name: '',
    nickname: '',
    birthdate: '',
    phone: '',
    email: '',
    sacraments: [],
    movements: [],
    newUnion: 'yes', // Changed default from 'no' to 'yes'
  });

  const [husbandData, setHusbandData] = useState<HusbandData>({
    name: '',
    nickname: '',
    birthdate: '',
    phone: '',
    email: '',
    sacraments: [],
    movements: [],
    newUnion: 'yes', // Changed default from 'no' to 'yes'
  });

  const [coupleData, setCoupleData] = useState<CoupleData>({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    unionTime: '',
    parish: '',
    children: [],
    emergencyContact: '',
    emergencyPhone: '',
  });

  const validateWifeData = () => {
    return (
      validateRequired(wifeData.name) &&
      validateRequired(wifeData.nickname) &&
      validateRequired(wifeData.birthdate) &&
      validateRequired(wifeData.phone) && validatePhone(wifeData.phone) &&
      validateRequired(wifeData.email) && validateEmail(wifeData.email)
    );
  };

  const validateHusbandData = () => {
    return (
      validateRequired(husbandData.name) &&
      validateRequired(husbandData.nickname) &&
      validateRequired(husbandData.birthdate) &&
      validateRequired(husbandData.phone) && validatePhone(husbandData.phone) &&
      validateRequired(husbandData.email) && validateEmail(husbandData.email)
    );
  };

  const validateCoupleData = () => {
    return (
      validateRequired(coupleData.address) &&
      validateRequired(coupleData.city) &&
      validateRequired(coupleData.state) &&
      validateRequired(coupleData.zipCode) &&
      validateRequired(coupleData.unionTime) &&
      validateRequired(coupleData.parish) &&
      validateRequired(coupleData.emergencyContact) &&
      validateRequired(coupleData.emergencyPhone)
    );
  };

  const nextStep = () => {
    let canContinue = false;
    
    if (currentStep === 1) {
      canContinue = validateWifeData();
      if (!canContinue) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos obrigatórios da esposa corretamente.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      canContinue = validateHusbandData();
      if (!canContinue) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos obrigatórios do esposo corretamente.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 3) {
      canContinue = validateCoupleData();
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

  const resetForm = () => {
    setCurrentStep(1);
    setWifeData({
      name: '',
      nickname: '',
      birthdate: '',
      phone: '',
      email: '',
      sacraments: [],
      movements: [],
      newUnion: 'yes', // Changed default from 'no' to 'yes'
    });
    setHusbandData({
      name: '',
      nickname: '',
      birthdate: '',
      phone: '',
      email: '',
      sacraments: [],
      movements: [],
      newUnion: 'yes', // Changed default from 'no' to 'yes'
    });
    setCoupleData({
      address: '',
      city: '',
      state: '',
      zipCode: '',
      unionTime: '',
      parish: '',
      children: [],
      emergencyContact: '',
      emergencyPhone: '',
    });
    setTermsAccepted(false);
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
      // 1. Inserir a inscrição do casal
      const { data: inscricaoData, error: inscricaoError } = await supabase
        .from('inscricoes')
        .insert({
          codigo_casal: Math.floor(1000 + Math.random() * 9000), // Código aleatório
          paroquia_frequentada: coupleData.parish,
          tempo_uniao: coupleData.unionTime ? parseInt(coupleData.unionTime) : null,
          data_hora_inscricao: new Date().toISOString(),
          contato_emergencia: coupleData.emergencyContact,
          telefone_emergencia: coupleData.emergencyPhone
        })
        .select();

      if (inscricaoError) throw inscricaoError;
      
      const inscricaoId = inscricaoData[0].id_inscricao;
      
      // 2. Inserir endereço - Usando o nome de coluna correto 'cep'
      const { error: enderecoError } = await supabase
        .from('enderecos')
        .insert({
          id_inscricao: inscricaoId,
          endereco_completo: coupleData.address,
          cidade: coupleData.city,
          estado: coupleData.state,
          cep: coupleData.zipCode // Usando 'cep' como nome da coluna
        });
      
      if (enderecoError) throw enderecoError;
      
      // 3. Inserir dados da esposa
      const { data: esposaData, error: esposaError } = await supabase
        .from('pessoas')
        .insert({
          id_inscricao: inscricaoId,
          nome_completo: wifeData.name,
          nome_cracha: wifeData.nickname,
          data_nascimento: wifeData.birthdate,
          telefone: wifeData.phone,
          email: wifeData.email,
          tipo_conjuge: 'esposa',
          sexo: 'F',
          nova_uniao: wifeData.newUnion === 'yes'
        })
        .select();
      
      if (esposaError) throw esposaError;
      
      // 4. Inserir dados do esposo
      const { data: esposoData, error: esposoError } = await supabase
        .from('pessoas')
        .insert({
          id_inscricao: inscricaoId,
          nome_completo: husbandData.name,
          nome_cracha: husbandData.nickname,
          data_nascimento: husbandData.birthdate,
          telefone: husbandData.phone,
          email: husbandData.email,
          tipo_conjuge: 'esposo',
          sexo: 'M',
          nova_uniao: husbandData.newUnion === 'yes'
        })
        .select();
      
      if (esposoError) throw esposoError;
      
      // 5. Inserir filhos, se houver
      if (coupleData.children.length > 0) {
        const filhosData = coupleData.children.map(child => ({
          id_inscricao: inscricaoId,
          nome: child.name,
          idade: parseInt(child.age),
          necessita_creche: child.needsDaycare
        }));
        
        const { error: filhosError } = await supabase
          .from('filhos')
          .insert(filhosData);
        
        if (filhosError) throw filhosError;
      }
      
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
          
          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className={`border-blue-200 hover:bg-blue-50 text-blue-700 ${currentStep === 1 ? 'invisible' : ''}`}
              disabled={isSubmitting}
            >
              Anterior
            </Button>
            
            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Próximo
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !termsAccepted}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Inscrição'}
                {!isSubmitting && <Check className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
