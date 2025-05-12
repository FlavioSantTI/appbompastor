
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import WifeForm from '@/features/form/components/WifeForm';
import HusbandForm from '@/features/form/components/HusbandForm';
import CoupleForm from '@/features/form/components/CoupleForm';
import { useCoupleFormState } from '@/features/form/hooks/useCoupleFormState';
import FormNavigation from '@/features/form/components/FormNavigation';
import Stepper from '@/features/form/components/Stepper';
import { FORM_SECTIONS } from '@/core/constants';
import { validateWifeData, validateHusbandData, validateCoupleData } from '@/features/form/utils/formValidation';

const steps = [
  { id: 1, name: FORM_SECTIONS.WIFE },
  { id: 2, name: FORM_SECTIONS.HUSBAND },
  { id: 3, name: FORM_SECTIONS.COUPLE },
];

interface CoupleDialogProps {
  couple: any | null;
  onClose: () => void;
  onUpdate: () => void;
}

export default function CoupleDialog({ couple, onClose, onUpdate }: CoupleDialogProps) {
  const { toast } = useToast();
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
  } = useCoupleFormState();

  useEffect(() => {
    if (couple) {
      // Fetch complete data for the couple
      const fetchCoupleDetails = async () => {
        try {
          // Fetch wife data
          const { data: wifeData, error: wifeError } = await supabase
            .from('pessoas')
            .select('*')
            .eq('id_inscricao', couple.id_inscricao)
            .eq('tipo_conjuge', 'esposa')
            .single();
            
          if (wifeError) throw wifeError;
          
          // Fetch husband data
          const { data: husbandData, error: husbandError } = await supabase
            .from('pessoas')
            .select('*')
            .eq('id_inscricao', couple.id_inscricao)
            .eq('tipo_conjuge', 'esposo')
            .single();
            
          if (husbandError) throw husbandError;
          
          // Fetch address data
          const { data: addressData, error: addressError } = await supabase
            .from('enderecos')
            .select('*')
            .eq('id_inscricao', couple.id_inscricao)
            .single();
            
          if (addressError && addressError.code !== 'PGRST116') throw addressError;
          
          // Fetch children data
          const { data: childrenData, error: childrenError } = await supabase
            .from('filhos')
            .select('*')
            .eq('id_inscricao', couple.id_inscricao);
            
          if (childrenError) throw childrenError;
          
          // Fetch inscription data
          const { data: inscriptionData, error: inscriptionError } = await supabase
            .from('inscricoes')
            .select('*')
            .eq('id_inscricao', couple.id_inscricao)
            .single();
            
          if (inscriptionError) throw inscriptionError;

          // Set wife form data
          setWifeData({
            name: wifeData?.nome_completo || '',
            nickname: wifeData?.nome_cracha || '',
            birthdate: wifeData?.data_nascimento ? formatDateFromDB(wifeData.data_nascimento) : '',
            phone: wifeData?.telefone || '',
            email: wifeData?.email || '',
            sacraments: [], // These would need to be fetched from another table
            movements: [], // These would need to be fetched from another table
            newUnion: wifeData?.nova_uniao ? 'yes' : 'no',
          });
          
          // Set husband form data
          setHusbandData({
            name: husbandData?.nome_completo || '',
            nickname: husbandData?.nome_cracha || '',
            birthdate: husbandData?.data_nascimento ? formatDateFromDB(husbandData.data_nascimento) : '',
            phone: husbandData?.telefone || '',
            email: husbandData?.email || '',
            sacraments: [], // These would need to be fetched from another table
            movements: [], // These would need to be fetched from another table
            newUnion: husbandData?.nova_uniao ? 'yes' : 'no',
          });
          
          // Set couple form data
          setCoupleData({
            address: addressData?.endereco_completo || '',
            city: addressData?.cidade || '',
            state: addressData?.estado || '',
            zipCode: addressData?.cep || '',
            unionTime: inscriptionData?.tempo_uniao?.toString() || '',
            parish: inscriptionData?.paroquia_frequentada || '',
            children: childrenData.map((child: any) => ({
              name: child.nome || '',
              age: child.idade?.toString() || '',
              needsDaycare: child.necessita_creche || false,
            })) || [],
            emergencyContact: inscriptionData?.contato_emergencia || '',
            emergencyPhone: inscriptionData?.telefone_emergencia || '',
          });
          
        } catch (error) {
          console.error('Error fetching couple details:', error);
          toast({
            title: "Erro ao carregar dados",
            description: "Não foi possível carregar todos os dados do casal.",
            variant: "destructive",
          });
        }
      };
      
      fetchCoupleDetails();
    }
  }, [couple, setWifeData, setHusbandData, setCoupleData, toast]);

  const formatDateFromDB = (dbDate: string) => {
    try {
      const date = new Date(dbDate);
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    } catch (e) {
      return '';
    }
  };

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
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUpdate = async () => {
    if (!couple) return;
    
    setIsSubmitting(true);
    
    try {
      // Validate current step data
      if (currentStep === 1 && !validateWifeData(wifeData)) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos obrigatórios da esposa corretamente.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      if (currentStep === 2 && !validateHusbandData(husbandData)) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos obrigatórios do esposo corretamente.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      if (currentStep === 3 && !validateCoupleData(coupleData)) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos obrigatórios do casal corretamente.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Update wife data
      const { error: wifeError } = await supabase
        .from('pessoas')
        .update({
          nome_completo: wifeData.name,
          nome_cracha: wifeData.nickname,
          data_nascimento: formatDateToDB(wifeData.birthdate),
          telefone: wifeData.phone,
          email: wifeData.email,
          nova_uniao: wifeData.newUnion === 'yes'
        })
        .eq('id_inscricao', couple.id_inscricao)
        .eq('tipo_conjuge', 'esposa');
        
      if (wifeError) throw wifeError;
      
      // Update husband data
      const { error: husbandError } = await supabase
        .from('pessoas')
        .update({
          nome_completo: husbandData.name,
          nome_cracha: husbandData.nickname,
          data_nascimento: formatDateToDB(husbandData.birthdate),
          telefone: husbandData.phone,
          email: husbandData.email,
          nova_uniao: husbandData.newUnion === 'yes'
        })
        .eq('id_inscricao', couple.id_inscricao)
        .eq('tipo_conjuge', 'esposo');
        
      if (husbandError) throw husbandError;
      
      // Update address data
      const { data: existingAddress } = await supabase
        .from('enderecos')
        .select('id_endereco')
        .eq('id_inscricao', couple.id_inscricao)
        .maybeSingle();
        
      if (existingAddress) {
        // Update existing address
        const { error: addressError } = await supabase
          .from('enderecos')
          .update({
            endereco_completo: coupleData.address,
            cidade: coupleData.city,
            estado: coupleData.state,
            cep: coupleData.zipCode
          })
          .eq('id_inscricao', couple.id_inscricao);
          
        if (addressError) throw addressError;
      } else {
        // Insert new address
        const { error: addressError } = await supabase
          .from('enderecos')
          .insert({
            id_inscricao: couple.id_inscricao,
            endereco_completo: coupleData.address,
            cidade: coupleData.city,
            estado: coupleData.state,
            cep: coupleData.zipCode
          });
          
        if (addressError) throw addressError;
      }
      
      // Update inscription data
      const { error: inscriptionError } = await supabase
        .from('inscricoes')
        .update({
          tempo_uniao: coupleData.unionTime ? parseInt(coupleData.unionTime) : null,
          paroquia_frequentada: coupleData.parish,
          contato_emergencia: coupleData.emergencyContact,
          telefone_emergencia: coupleData.emergencyPhone
        })
        .eq('id_inscricao', couple.id_inscricao);
        
      if (inscriptionError) throw inscriptionError;
      
      // Update children
      // First delete existing children
      const { error: deleteChildrenError } = await supabase
        .from('filhos')
        .delete()
        .eq('id_inscricao', couple.id_inscricao);
        
      if (deleteChildrenError) throw deleteChildrenError;
      
      // Then insert new children if any
      if (coupleData.children.length > 0) {
        const childrenToInsert = coupleData.children.map(child => ({
          id_inscricao: couple.id_inscricao,
          nome: child.name,
          idade: parseInt(child.age) || 0,
          necessita_creche: child.needsDaycare
        }));
        
        const { error: insertChildrenError } = await supabase
          .from('filhos')
          .insert(childrenToInsert);
          
        if (insertChildrenError) throw insertChildrenError;
      }
      
      toast({
        title: "Atualizado com sucesso",
        description: "Os dados do casal foram atualizados.",
      });
      
      onUpdate();
      onClose();
    } catch (error: any) {
      console.error('Error updating couple:', error);
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Ocorreu um erro ao atualizar os dados do casal.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatDateToDB = (dateString: string) => {
    if (!dateString) return null;
    
    try {
      const parts = dateString.split('/');
      if (parts.length !== 3) return null;
      
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    } catch (e) {
      return null;
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
      default:
        return null;
    }
  };

  return (
    <Dialog open={!!couple} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-950 border border-blue-100 dark:border-blue-900">
        <DialogHeader>
          <DialogTitle className="text-2xl text-blue-800 dark:text-blue-300">Editar Casal</DialogTitle>
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
            onSubmit={handleUpdate}
            isSubmitting={isSubmitting}
            canSubmit={true}
            submitLabel="Salvar"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
