import { PARAMS_KEY } from './constants/constants';
import { displayGeneralInformation } from './views/generalViews';
import { displayCustomersTable } from './views/customersVIew';

/**
 * Init parameter for query customers
 * Default page is 1
 * Default page size is 8
 */
const params: Record<string, string> = {};
params[PARAMS_KEY.page] = '1';
params[PARAMS_KEY.limit] = '8';

displayGeneralInformation();
displayCustomersTable(params);
