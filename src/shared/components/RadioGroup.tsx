
import React from 'react';

interface RadioGroupProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ 
  label, 
  name, 
  options, 
  selectedValue, 
  onChange 
}) => {
  return (
    <div className="mb-4">
      <p className="flutter-label mb-2">{label}</p>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`radio-${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="w-4 h-4 text-flutter-primary focus:ring-flutter-primary cursor-pointer"
            />
            <label
              htmlFor={`radio-${name}-${option.value}`}
              className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
