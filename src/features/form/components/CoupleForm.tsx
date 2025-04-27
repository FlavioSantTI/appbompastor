
import React, { useState } from 'react';
import FormInput from '@/shared/components/FormInput';
import { validateRequired } from '@/core/validation';

export interface ChildData {
  name: string;
  age: string;
  needsDaycare: boolean;
}

export interface CoupleData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  unionTime: string;
  parish: string;
  children: ChildData[];
  emergencyContact: string;
  emergencyPhone: string;
}

interface CoupleFormProps {
  data: CoupleData;
  onChange: (data: CoupleData) => void;
}

const CoupleForm: React.FC<CoupleFormProps> = ({ data, onChange }) => {
  const updateField = (field: keyof CoupleData, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const updateChild = (index: number, field: keyof ChildData, value: any) => {
    const updatedChildren = [...data.children];
    updatedChildren[index] = {
      ...updatedChildren[index],
      [field]: value
    };
    updateField('children', updatedChildren);
  };

  const addChild = () => {
    updateField('children', [
      ...data.children,
      { name: '', age: '', needsDaycare: false }
    ]);
  };

  const removeChild = (index: number) => {
    const updatedChildren = [...data.children];
    updatedChildren.splice(index, 1);
    updateField('children', updatedChildren);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Dados do Casal</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          id="address"
          label="Endereço"
          value={data.address}
          onChange={(value) => updateField('address', value)}
          required
        />
        
        <FormInput
          id="city"
          label="Cidade"
          value={data.city}
          onChange={(value) => updateField('city', value)}
          required
        />
        
        <FormInput
          id="state"
          label="Estado"
          value={data.state}
          onChange={(value) => updateField('state', value)}
          required
        />
        
        <FormInput
          id="zipCode"
          label="CEP"
          value={data.zipCode}
          onChange={(value) => updateField('zipCode', value)}
          required
        />
      </div>
      
      <FormInput
        id="unionTime"
        label="Tempo de União"
        value={data.unionTime}
        onChange={(value) => updateField('unionTime', value)}
        required
      />
      
      <FormInput
        id="parish"
        label="Paróquia que Frequenta"
        value={data.parish}
        onChange={(value) => updateField('parish', value)}
        required
      />
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Filhos</h3>
          <button
            type="button"
            onClick={addChild}
            className="text-sm flutter-button"
          >
            Adicionar Filho
          </button>
        </div>
        
        {data.children.map((child, index) => (
          <div key={index} className="flutter-card p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Filho {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeChild(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remover
              </button>
            </div>
            
            <FormInput
              id={`child-name-${index}`}
              label="Nome"
              value={child.name}
              onChange={(value) => updateChild(index, 'name', value)}
            />
            
            <FormInput
              id={`child-age-${index}`}
              label="Idade"
              value={child.age}
              onChange={(value) => updateChild(index, 'age', value)}
            />
            
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id={`child-daycare-${index}`}
                checked={child.needsDaycare}
                onChange={(e) => updateChild(index, 'needsDaycare', e.target.checked)}
                className="w-4 h-4 text-flutter-primary focus:ring-flutter-primary rounded cursor-pointer"
              />
              <label
                htmlFor={`child-daycare-${index}`}
                className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Necessita de Creche
              </label>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Contato de Emergência</h3>
        <FormInput
          id="emergencyContact"
          label="Nome do Contato"
          value={data.emergencyContact}
          onChange={(value) => updateField('emergencyContact', value)}
          required
        />
        
        <FormInput
          id="emergencyPhone"
          label="Telefone"
          value={data.emergencyPhone}
          onChange={(value) => updateField('emergencyPhone', value)}
          required
        />
      </div>
    </div>
  );
};

export default CoupleForm;
