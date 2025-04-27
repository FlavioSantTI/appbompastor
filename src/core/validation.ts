
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value !== undefined && value !== null && value.trim() !== '';
};

export const formatPhone = (value: string): string => {
  if (!value) return '';
  
  // Remove non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Format the phone number
  if (digits.length <= 2) {
    return `(${digits}`;
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  } else if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  } else {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }
};

export const formatDate = (value: string): string => {
  if (!value) return '';
  
  // Remove non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Format the date
  if (digits.length <= 2) {
    return digits;
  } else if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  } else {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  }
};
