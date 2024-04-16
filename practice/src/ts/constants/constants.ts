import { Map } from '../types/map';
export const GENERAL_API = process.env.API_URL + '/general';
export const CUSTOMERS_API = process.env.API_URL + '/customers';

export const DEBOUNCE_DELAY = 2000;

export const VALIDATE_REGEX = {
  phone: /\(\d{3}\)\s\d{3}-\d{4}$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  hasHTMLTag: /<("[^"]*"|'[^']*'|[^'">])*>/,
};

export const CUSTOMER_TABLE_HEADING: string[] = [
  'customer name',
  'company',
  'phone number',
  'email',
  'country',
  'status',
];

export const enum QUERY_PARAM_KEYS {
  page = 'page',
  limit = 'limit',
  search = 'name',
  sort = 'sortBy',
  order = 'order',
}

export const LIST_ERROR_MSG: Map = {
  name: {
    required: 'The customer name field is required',
    invalid: 'The customer name invalid',
  },
  company: {
    required: 'The company name field is required',
    invalid: 'The company name invalid',
  },
  phone: {
    required: 'The phone number field is required',
    invalid: 'The phone number invalid. Please enter ten digits',
  },
  email: {
    required: 'The email field is required',
    invalid: 'The email invalid. Enter email in this format: example@abc.xyz',
  },
  country: {
    required: 'The country field is required',
  },
};
