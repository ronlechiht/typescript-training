import { displayGeneralInformation } from './modules/general/generalModule';
import { displayCustomersTable } from './modules/customer/displayCustomersTable';

const params: Record<string, string> = {
  page: '1',
  limit: '8',
};

displayGeneralInformation();
displayCustomersTable(params);
