import { displayGeneralInformation } from './views/generalView';
import { CustomerView } from './views/customersView';
import { ModalView } from './views/modalView';

const customerView = new CustomerView();
const modalView = new ModalView();

displayGeneralInformation();
customerView.displayCustomersTable(customerView.params);
modalView;
