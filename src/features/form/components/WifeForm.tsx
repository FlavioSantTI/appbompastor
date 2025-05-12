
import React from 'react';
import PersonForm, { PersonData } from './PersonForm';

// Re-export the PersonData interface as WifeData for compatibility with existing code
export type WifeData = PersonData;

interface WifeFormProps {
  data: WifeData;
  onChange: (data: WifeData) => void;
}

const WifeForm: React.FC<WifeFormProps> = ({ data, onChange }) => {
  return (
    <PersonForm
      data={data}
      onChange={onChange}
      personType="wife"
    />
  );
};

export default WifeForm;
