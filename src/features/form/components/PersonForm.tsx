
import React from 'react';
import FormInput from '@/shared/components/FormInput';
import CheckboxGroup from '@/shared/components/CheckboxGroup';
import RadioGroup from '@/shared/components/RadioGroup';
import { validateEmail, validatePhone, formatPhone, formatDate } from '@/core/validation';
import { SACRAMENTS, MOVEMENTS, VALIDATION_MESSAGES } from '@/core/constants';

// Shared interface for both Wife and Husband data
export interface PersonData {
  name: string;
  nickname: string;
  birthdate: string;
  phone: string;
  email: string;
  sacraments: string[];
  movements: string[];
  newUnion: string;
}

interface PersonFormProps {
  data: PersonData;
  onChange: (data: PersonData) => void;
  personType: 'wife' | 'husband';
}

const PersonForm: React.FC<PersonFormProps> = ({ data, onChange, personType }) => {
  const updateField = (field: keyof PersonData, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const unionOptions = [
    { label: 'Sim', value: 'yes' },
    { label: 'Não', value: 'no' }
  ];

  const title = personType === 'wife' ? 'Dados da Esposa' : 'Dados do Esposo';
  const idPrefix = personType === 'wife' ? 'wife' : 'husband';

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">{title}</h2>
      
      <FormInput
        id={`${idPrefix}-name`}
        label="Nome Completo"
        value={data.name}
        onChange={(value) => updateField('name', value)}
        required
      />
      
      <FormInput
        id={`${idPrefix}-nickname`}
        label="Apelido para Crachá"
        value={data.nickname}
        onChange={(value) => updateField('nickname', value)}
        required
      />
      
      <FormInput
        id={`${idPrefix}-birthdate`}
        label="Data de Nascimento"
        value={data.birthdate}
        onChange={(value) => updateField('birthdate', value)}
        placeholder="DD/MM/AAAA"
        formatFn={formatDate}
        required
      />
      
      <FormInput
        id={`${idPrefix}-phone`}
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
        id={`${idPrefix}-email`}
        label="E-mail"
        type="email"
        value={data.email}
        onChange={(value) => updateField('email', value)}
        validator={validateEmail}
        errorMessage={VALIDATION_MESSAGES.INVALID_EMAIL}
        required
      />
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
        <CheckboxGroup
          label="Sacramentos"
          options={SACRAMENTS}
          selectedOptions={data.sacraments}
          onChange={(selected) => updateField('sacraments', selected)}
        />
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
        <CheckboxGroup
          label="Movimentos na Igreja"
          options={MOVEMENTS}
          selectedOptions={data.movements}
          onChange={(selected) => updateField('movements', selected)}
        />
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
        <RadioGroup
          label="Nova União?"
          name={`${idPrefix}-new-union`}
          options={unionOptions}
          selectedValue={data.newUnion}
          onChange={(value) => updateField('newUnion', value)}
        />
      </div>
    </div>
  );
};

export default PersonForm;
