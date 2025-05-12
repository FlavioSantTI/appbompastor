
import { useState } from 'react';
import { WifeData } from '@/features/form/components/WifeForm';
import { HusbandData } from '@/features/form/components/HusbandForm';
import { CoupleData } from '@/features/form/components/CoupleForm';

export interface CoupleFormState {
  wifeData: WifeData;
  husbandData: HusbandData;
  coupleData: CoupleData;
  currentStep: number;
  termsAccepted: boolean;
}

export const useCoupleFormState = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [wifeData, setWifeData] = useState<WifeData>({
    name: '',
    nickname: '',
    birthdate: '',
    phone: '',
    email: '',
    sacraments: [],
    movements: [],
    newUnion: 'yes', // Default is 'yes'
  });

  const [husbandData, setHusbandData] = useState<HusbandData>({
    name: '',
    nickname: '',
    birthdate: '',
    phone: '',
    email: '',
    sacraments: [],
    movements: [],
    newUnion: 'yes', // Default is 'yes'
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
      newUnion: 'yes', // Default is 'yes'
    });
    setHusbandData({
      name: '',
      nickname: '',
      birthdate: '',
      phone: '',
      email: '',
      sacraments: [],
      movements: [],
      newUnion: 'yes', // Default is 'yes'
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

  return {
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
  };
};
