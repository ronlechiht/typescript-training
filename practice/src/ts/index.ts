import { displayGeneralInformation } from './views/generalView';
import { CustomerView } from './views/customersView';
import { ModalView } from './views/modalView';
import { DropdownMenuView } from './views/dropdownMenuView';

const customerView = new CustomerView();
const modalView = new ModalView();
const dropdownMenuView = new DropdownMenuView();

displayGeneralInformation();
customerView.displayCustomersTable(customerView.params);
modalView;
dropdownMenuView;
