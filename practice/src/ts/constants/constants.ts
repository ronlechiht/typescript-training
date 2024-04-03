export const GENERAL_API = process.env.API_URL + '/general';
export const CUSTOMERS_API = process.env.API_URL + '/customers';

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
