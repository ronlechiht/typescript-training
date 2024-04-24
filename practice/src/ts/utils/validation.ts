import { VALIDATE_REGEX } from '../constants/constants';

const validateEmptiness = (input: string): string | null => {
  if (input) return null;
  return 'required';
};

const validateHTMLTag = (input: string): string | null => {
  const re: RegExp = VALIDATE_REGEX.hasHTMLTag;
  if (!re.test(input)) return null;
  return 'invalid';
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
  name: [validateEmptiness, validateHTMLTag],
  company: [validateEmptiness, validateHTMLTag],
  phone: [validateEmptiness, validatePhoneNumber],
  email: [validateEmptiness, validateEmail],
  country: [validateEmptiness],
};

export const validateForm = (data: Record<string, string>) => {
  const errors: Record<string, string> = {};

  for (const key in data) {
    const error = validateField(key, data[key]);
    if (error) errors[key] = error;
  }

  return errors;
};

export const validateField = (field: string, input: string) => {
  let error: string | null = null;
  // eslint-disable-next-line no-prototype-builtins
  if (validationSchema.hasOwnProperty(field)) {
    const customerProperty = input;
    const validators = validationSchema[field as keyof typeof validationSchema];
    for (const validator of validators) {
      error = validator(customerProperty);
      if (error) break;
    }
  }

  return error;
};
