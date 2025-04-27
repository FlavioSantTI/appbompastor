
import React, { useState } from 'react';
import Stepper from './components/Stepper';
import WifeForm, { WifeData } from './components/WifeForm';
import HusbandForm, { HusbandData } from './components/HusbandForm';
import CoupleForm, { CoupleData } from './components/CoupleForm';
import ReviewForm from './components/ReviewForm';
import { FORM_SECTIONS } from '@/core/constants';
import { validateRequired, validateEmail, validatePhone } from '@/core/validation';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 1, name: FORM_SECTIONS.WIFE },
  { id: 2, name: FORM_SECTIONS.HUSBAND },
  { id: 3, name: FORM_SECTIONS.COUPLE },
  { id: 4, name: FORM_SECTIONS.REVIEW },
];

const FormContainer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { toast } = useToast();
  
  const [wifeData, setWifeData] = useState<WifeData>({
    name: '',
    nickname: '',
    birthdate: '',
    phone: '',
    email: '',
    sacraments: [],
    movements: [],
    newUnion: 'no',
  });

  const [husbandData, setHusbandData] = useState<HusbandData>({
    name: '',
    nickname: '',
    birthdate: '',
    phone: '',
    email: '',
    sacraments: [],
    movements: [],
    newUnion: 'no',
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
          description: "Por favor, preencha todos os campos obrigatórios corretamente.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      canContinue = validateHusbandData();
      if (!canContinue) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos obrigatórios corretamente.",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 3) {
      canContinue = validateCoupleData();
      if (!canContinue) {
        toast({
          title: "Dados incompletos",
          description: "Por favor, preencha todos os campos obrigatórios corretamente.",
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

  const handleSubmit = () => {
    if (!termsAccepted) {
      toast({
        title: "Termos não aceitos",
        description: "Por favor, aceite os termos para finalizar a inscrição.",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would send the data to the backend
    console.log('Submission data:', {
      wifeData,
      husbandData,
      coupleData,
      submissionDate: new Date().toISOString(),
    });
    
    toast({
      title: "Inscrição enviada com sucesso!",
      description: "Em breve você receberá um email de confirmação.",
    });
    
    // Reset form and go back to step 1
    setCurrentStep(1);
    setWifeData({
      name: '',
      nickname: '',
      birthdate: '',
      phone: '',
      email: '',
      sacraments: [],
      movements: [],
      newUnion: 'no',
    });
    setHusbandData({
      name: '',
      nickname: '',
      birthdate: '',
      phone: '',
      email: '',
      sacraments: [],
      movements: [],
      newUnion: 'no',
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
    <div className="max-w-3xl mx-auto bg-white dark:bg-card shadow-lg rounded-2xl p-6">
      <Stepper steps={steps} currentStep={currentStep} />
      
      <div className="mt-6">
        {renderStepContent()}
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className={`px-6 py-2 rounded-full border border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-all ${
            currentStep === 1 ? 'invisible' : ''
          }`}
        >
          Anterior
        </button>
        
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            className="flutter-button"
          >
            Próximo
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className={`flutter-button ${!termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!termsAccepted}
          >
            Enviar Inscrição
          </button>
        )}
      </div>
    </div>
  );
};

export default FormContainer;
