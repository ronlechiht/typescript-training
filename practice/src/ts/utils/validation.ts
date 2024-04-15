import { VALIDATE_REGEX } from '../constants/constants';

const validateEmptiness = (input: string): string | null => {
  if (input) return null;
  return 'required';
};

const validatePhoneNumber = (phoneNumber: string): string | null => {
  const re: RegExp = VALIDATE_REGEX.phone;
  if (re.test(phoneNumber)) return null;
  return 'invalid';
};

const validateEmail = (email: string): string | null => {
  const re: RegExp = VALIDATE_REGEX.email;
  if (re.test(email)) return null;
  return 'invalid';
};

const validationSchema = {
  name: [validateEmptiness],
  company: [validateEmptiness],
  phone: [validateEmptiness, validatePhoneNumber],
  email: [validateEmptiness, validateEmail],
  country: [validateEmptiness],
};

export const validateForm = (data) => {
  const errors = {};

  for (const key in data) {
    const error = validateField(key, data[key]);
    if (error) errors[key] = error;
  }

  return errors;
};

export const validateField = (field, input) => {
  let error = null;
  if (Object.prototype.hasOwnProperty.call(validationSchema, field)) {
    const customerProperty = input;
    const validators = validationSchema[field];
    for (const validator of validators) {
      error = validator(customerProperty);
      if (error) break;
    }
  }

  return error;
};
