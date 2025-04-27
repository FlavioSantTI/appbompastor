
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
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="flutter-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`flutter-input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {error && <p className="flutter-error">{error}</p>}
    </div>
  );
};

export default FormInput;
