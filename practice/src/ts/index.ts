import { displayGeneralInformation } from './views/generalView';
import { CustomerView } from './views/customersView';

const customerView = new CustomerView();

displayGeneralInformation();
customerView.displayCustomersTable(customerView.params);
