import { QUERY_PARAM_KEYS } from './constants/constants';
import { displayGeneralInformation } from './views/generalViews';
import { displayCustomersTable } from './views/customersVIew';
import { QueryParams } from './types/queryParamsType';

/**
 * Init parameter for query customers
 * Default page is 1
 * Default page size is 8
 */
const params: QueryParams = {
  [QUERY_PARAM_KEYS.page]: 1,
  [QUERY_PARAM_KEYS.limit]: 8,
};

displayGeneralInformation();
displayCustomersTable(params);
