
import React from 'react';

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ 
  label, 
  options, 
  selectedOptions, 
  onChange 
}) => {
  const handleChange = (option: string) => {
    let newSelected = [...selectedOptions];
    
    if (newSelected.includes(option)) {
      newSelected = newSelected.filter(item => item !== option);
    } else {
      newSelected.push(option);
    }
    
    onChange(newSelected);
  };

  return (
    <div className="mb-4">
      <p className="flutter-label mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              id={`checkbox-${option}`}
              checked={selectedOptions.includes(option)}
              onChange={() => handleChange(option)}
              className="w-4 h-4 text-flutter-primary focus:ring-flutter-primary rounded cursor-pointer"
            />
            <label
              htmlFor={`checkbox-${option}`}
              className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
