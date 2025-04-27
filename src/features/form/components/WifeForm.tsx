
import React, { useState } from 'react';
import FormInput from '@/shared/components/FormInput';
import CheckboxGroup from '@/shared/components/CheckboxGroup';
import RadioGroup from '@/shared/components/RadioGroup';
import { validateEmail, validatePhone, formatPhone, formatDate } from '@/core/validation';
import { SACRAMENTS, MOVEMENTS, VALIDATION_MESSAGES } from '@/core/constants';

export interface WifeData {
  name: string;
  nickname: string;
  birthdate: string;
  phone: string;
  email: string;
  sacraments: string[];
  movements: string[];
  newUnion: string;
}

interface WifeFormProps {
  data: WifeData;
  onChange: (data: WifeData) => void;
}

const WifeForm: React.FC<WifeFormProps> = ({ data, onChange }) => {
  const updateField = (field: keyof WifeData, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const unionOptions = [
    { label: 'Sim', value: 'yes' },
    { label: 'Não', value: 'no' }
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Dados da Esposa</h2>
      
      <FormInput
        id="wife-name"
        label="Nome Completo"
        value={data.name}
        onChange={(value) => updateField('name', value)}
        required
      />
      
      <FormInput
        id="wife-nickname"
        label="Apelido para Crachá"
        value={data.nickname}
        onChange={(value) => updateField('nickname', value)}
        required
      />
      
      <FormInput
        id="wife-birthdate"
        label="Data de Nascimento"
        value={data.birthdate}
        onChange={(value) => updateField('birthdate', value)}
        placeholder="DD/MM/AAAA"
        formatFn={formatDate}
        required
      />
      
      <FormInput
        id="wife-phone"
        label="Telefone"
        value={data.phone}
        onChange={(value) => updateField('phone', value)}
        placeholder="(99) 99999-9999"
        formatFn={formatPhone}
        validator={validatePhone}
        errorMessage={VALIDATION_MESSAGES.INVALID_PHONE}
        required
      />
      
      <FormInput
        id="wife-email"
        label="E-mail"
        type="email"
        value={data.email}
        onChange={(value) => updateField('email', value)}
        validator={validateEmail}
        errorMessage={VALIDATION_MESSAGES.INVALID_EMAIL}
        required
      />
      
      <CheckboxGroup
        label="Sacramentos"
        options={SACRAMENTS}
        selectedOptions={data.sacraments}
        onChange={(selected) => updateField('sacraments', selected)}
      />
      
      <CheckboxGroup
        label="Movimentos na Igreja"
        options={MOVEMENTS}
        selectedOptions={data.movements}
        onChange={(selected) => updateField('movements', selected)}
      />
      
      <RadioGroup
        label="Nova União?"
        name="wife-new-union"
        options={unionOptions}
        selectedValue={data.newUnion}
        onChange={(value) => updateField('newUnion', value)}
      />
    </div>
  );
};

export default WifeForm;
