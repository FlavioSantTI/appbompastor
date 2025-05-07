
import { useState } from 'react';
import { validateRequired } from '@/core/validation';
import { VALIDATION_MESSAGES } from '@/core/constants';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  formatFn?: (value: string) => string;
  validator?: (value: string) => boolean;
  errorMessage?: string;
}

const FormInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  formatFn,
  validator,
  errorMessage = VALIDATION_MESSAGES.REQUIRED,
}: FormInputProps) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatFn ? formatFn(e.target.value) : e.target.value;
    onChange(newValue);
    
    if (touched) {
      validateInput(newValue);
    }
  };

  const validateInput = (inputValue: string) => {
    if (required && !validateRequired(inputValue)) {
      setError(VALIDATION_MESSAGES.REQUIRED);
      return false;
    }
    
    if (validator && !validator(inputValue)) {
      setError(errorMessage);
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleBlur = () => {
    setTouched(true);
    validateInput(value);
    setFocused(false);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-md transition-all duration-200
          border ${error ? 'border-red-500' : focused ? 'border-blue-400' : 'border-blue-100'} 
          ${focused ? 'ring-2 ring-blue-200' : ''}
          bg-blue-50 dark:bg-blue-900/20 
          focus:outline-none focus:bg-white dark:focus:bg-blue-900/30`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
