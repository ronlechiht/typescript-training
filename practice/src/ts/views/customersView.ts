//Import
import { QUERY_PARAM_KEYS } from '../constants/constants';
import { renderTable } from '../templates/tableTemplate';
import { QueryParams } from '../types/queryParamsType';
import { CustomerFormData } from '../types/formDataType';
import { debounce } from '../utils/debounce';
import { ModalView } from './modalView';
import { displaySnackbar } from '../helpers/snackbar';
import { SNACKBAR_MSG, SNACKBAR_STATUS } from '../constants/constants';
import { displayLoading, hideLoading } from '../helpers/loading';
import { CustomerService } from '../services/customerService';
import { DropdownMenuView } from './dropdownMenuView';
export class CustomerView {
  customerService: CustomerService;
  params: QueryParams;
  modalView: ModalView;
  dropdownMenuView: DropdownMenuView;

  constructor() {
    this.customerService = new CustomerService();
    this.params = {
      [QUERY_PARAM_KEYS.page]: 1,
      [QUERY_PARAM_KEYS.limit]: 8,
      [QUERY_PARAM_KEYS.sort]: 'id',
      [QUERY_PARAM_KEYS.order]: 'desc',
    };
    this.modalView = new ModalView();
    this.dropdownMenuView = new DropdownMenuView();

    this.bindPagination();
    this.bindSearchDebounce(debounce(this.displayCustomersTable));
    this.bindSearchOnChanged();
    this.bindSortOnChanged();
    this.dropdownMenuView.bindClickDropdownBtn(
      this.modalView.displayEditModal,
      this.modalView.displayRemoveModal,
    );
    this.modalView.bindSubmitModal(
      this.handlerAddCustomer,
      this.handlerEditCustomer,
      this.handlerDeleteCustomer,
    );
  }

  displayCustomersTable = async (params: QueryParams): Promise<void> => {
    const customersTable = document.querySelector('.customers-table-body')!;
    displayLoading();
    try {
      const customers = await this.customerService.getCustomer(params);
      hideLoading();

      //Disable next pagination at last page
      if (
        !Object.keys(customers).length &&
        this.params[QUERY_PARAM_KEYS.page] > 1
      ) {
        this.params[QUERY_PARAM_KEYS.page] -= 1;
        displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.lastPage);
        const nextBtn: HTMLButtonElement = document.querySelector(
          '.btn-pagination-next',
        )!;
        nextBtn.disabled = true;
        return;
      }

      customersTable.innerHTML = renderTable(customers, params);
    } catch (error) {
      hideLoading();
      displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed);
    }
  };

  handlerAddCustomer = async (customer: CustomerFormData) => {
    await this.customerService.addCustomer(customer);
    await this.displayCustomersTable(this.params);
  };

  handlerEditCustomer = async (customer: CustomerFormData, id: string) => {
    await this.customerService.updateCustomer(customer, id);
    await this.displayCustomersTable(this.params);
  };

  handlerDeleteCustomer = async (id: string) => {
    await this.customerService.removeCustomer(id);
    //Load previous page if delete last customer
    const tableBody = document.querySelector('.table-body')!;
    if (tableBody.children.length === 2) {
      this.params[QUERY_PARAM_KEYS.page] -= 1;
    }
    await this.displayCustomersTable(this.params);
  };

  /**
   * Add event at next button and previous button
   */
  bindPagination = () => {
    const customersTable = document.querySelector('.customers-table-body')!;
    customersTable.addEventListener('click', (event) => {
      if ((event.target as Element).className === 'btn-pagination-next') {
        this.params[QUERY_PARAM_KEYS.page] += 1;
        this.displayCustomersTable(this.params);
      }
      if ((event.target as Element).className === 'btn-pagination-previous') {
        this.params[QUERY_PARAM_KEYS.page] -= 1;
        this.displayCustomersTable(this.params);
      }
    });
  };

  /**
   * Add search event with debounce effect
   */
  bindSearchDebounce = (handler: CallableFunction) => {
    const searchInput: HTMLInputElement =
      document.querySelector('.search-input')!;
    searchInput.addEventListener('keyup', () => {
      this.params[QUERY_PARAM_KEYS.search] = searchInput.value;

      handler(this.params);
    });
  };

  /**
   * Add search event with enter action
   */
  bindSearchOnChanged = () => {
    const searchInput: HTMLInputElement =
      document.querySelector('.search-input')!;
    searchInput.addEventListener('change', () => {
      this.params[QUERY_PARAM_KEYS.search] = searchInput.value;

      this.displayCustomersTable(this.params);
    });
  };

  /**
   * Add sort event when change value of sort box
   */
  bindSortOnChanged = () => {
    const sortOption = <HTMLInputElement>(
      document.querySelector('.sort-option-list')!
    );
    sortOption.addEventListener('change', () => {
      this.params[QUERY_PARAM_KEYS.sort] = sortOption.value;
      if (sortOption.value === 'id') {
        this.params[QUERY_PARAM_KEYS.order] = 'desc';
      } else {
        this.params[QUERY_PARAM_KEYS.order] = 'asc';
      }

      this.displayCustomersTable(this.params);
    });
  };
}
