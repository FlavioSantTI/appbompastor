
import { validateRequired, validateEmail, validatePhone } from '@/core/validation';
import { WifeData } from '@/features/form/components/WifeForm';
import { HusbandData } from '@/features/form/components/HusbandForm';
import { CoupleData } from '@/features/form/components/CoupleForm';

export const validateWifeData = (data: WifeData): boolean => {
  return (
    validateRequired(data.name) &&
    validateRequired(data.nickname) &&
    validateRequired(data.birthdate) &&
    validateRequired(data.phone) && validatePhone(data.phone) &&
    validateRequired(data.email) && validateEmail(data.email)
  );
};

export const validateHusbandData = (data: HusbandData): boolean => {
  return (
    validateRequired(data.name) &&
    validateRequired(data.nickname) &&
    validateRequired(data.birthdate) &&
    validateRequired(data.phone) && validatePhone(data.phone) &&
    validateRequired(data.email) && validateEmail(data.email)
  );
};

export const validateCoupleData = (data: CoupleData): boolean => {
  return (
    validateRequired(data.address) &&
    validateRequired(data.city) &&
    validateRequired(data.state) &&
    validateRequired(data.zipCode) &&
    validateRequired(data.unionTime) &&
    validateRequired(data.parish) &&
    validateRequired(data.emergencyContact) &&
    validateRequired(data.emergencyPhone)
  );
};
