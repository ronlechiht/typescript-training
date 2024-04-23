export const GENERAL_API = process.env.API_URL + '/general';
export const CUSTOMERS_API = process.env.API_URL + '/customers';

export const DEBOUNCE_DELAY = 1000;
export const SNACKBAR_DELAY = 2 * 1000;

export const VALIDATE_REGEX = {
  //Phone format: (123) 123-1234
  phone: /\(\d{3}\)\s\d{3}-\d{4}$/,
  //Email format: example@abc.xyz
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  //Check HTML tag in input data
  hasHTMLTag: /<("[^"]*"|'[^']*'|[^'">])*>/,
};

/**
 * Heading of customers table
 */
export const CUSTOMER_TABLE_HEADING: string[] = [
  'customer name',
  'company',
  'phone number',
  'email',
  'country',
  'status',
];

/**
 * query param keys of Mock API
 */
export const enum QUERY_PARAM_KEYS {
  page = 'page',
  limit = 'limit',
  search = 'name',
  sort = 'sortBy',
  order = 'order',
}

/**
 * List of error messages for customer data on add/update form
 */
export const LIST_ERROR_MSG: Record<string, Record<string, string>> = {
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

/**
 * List of snackbar message
 */
export const SNACKBAR_MSG: Record<string, string> = {
  successAdd: 'Customer has been successfully added',
  successEdit: 'Customer has been successfully updated',
  successDelete: 'Customer has been successfully removed',
  failed: 'Something went wrong',
  lastPage: 'You are on the last page',
};

/**
 * Status of snackbar
 */
export const SNACKBAR_STATUS: Record<string, string> = {
  success: 'success',
  failed: 'failed',
};
