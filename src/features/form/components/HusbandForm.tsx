
import React from 'react';
import PersonForm, { PersonData } from './PersonForm';

// Re-export the PersonData interface as HusbandData for compatibility with existing code
export type HusbandData = PersonData;

interface HusbandFormProps {
  data: HusbandData;
  onChange: (data: HusbandData) => void;
}

const HusbandForm: React.FC<HusbandFormProps> = ({ data, onChange }) => {
  return (
    <PersonForm
      data={data}
      onChange={onChange}
      personType="husband"
    />
  );
};

export default HusbandForm;
