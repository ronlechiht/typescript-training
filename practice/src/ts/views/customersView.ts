//Import
import { CUSTOMERS_API, QUERY_PARAM_KEYS } from '../constants/constants';
import { HttpService } from '../services/httpServices';
import { genTable } from '../templates/tableTemplate';
import { QueryParams } from '../types/queryParamsType';
import { CustomerFormData } from '../types/formDataType';
import { debounce } from '../utils/debounce';
import { ModalView } from './modalView';
import { displaySnackbar } from '../helpers/snackbar';
import { SNACKBAR_MSG, SNACKBAR_STATUS } from '../constants/constants';
import { displayLoading, hideLoading } from '../helpers/loading';

export class CustomerView {
  customerService: HttpService<CustomerFormData>;
  params: QueryParams;
  modalView: ModalView;

  constructor() {
    this.customerService = new HttpService<CustomerFormData>(CUSTOMERS_API);
    this.params = {
      [QUERY_PARAM_KEYS.page]: 1,
      [QUERY_PARAM_KEYS.limit]: 8,
      [QUERY_PARAM_KEYS.sort]: 'id',
      [QUERY_PARAM_KEYS.order]: 'desc',
    };
    this.modalView = new ModalView();

    this.bindPagination();
    this.bindSearchDebounce(debounce(this.displayCustomersTable));
    this.bindSearchOnChanged();
    this.bindSortOnChanged();
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
      const customers = await this.customerService.get(params);
      hideLoading();

      if (!Object.keys(customers).length || customers === 'Not found') {
        customersTable.innerHTML = `
        <p class="message-empty">There are no customers in the list</p>
        `;
        return;
      }

      customersTable.innerHTML = genTable(customers, params);
    } catch (error) {
      hideLoading();
      displaySnackbar(SNACKBAR_STATUS.failed, SNACKBAR_MSG.failed);
    }
  };

  handlerAddCustomer = async (customer: CustomerFormData) => {
    await this.customerService.post(customer);
    await this.displayCustomersTable(this.params);
  };

  handlerEditCustomer = async (customer: CustomerFormData, id: string) => {
    await this.customerService.put(customer, id);
    await this.displayCustomersTable(this.params);
  };

  handlerDeleteCustomer = async (id: string) => {
    await this.customerService.delete(id);
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

  bindSearchDebounce = (handler: CallableFunction) => {
    const searchInput = document.querySelector('.search-input')!;
    searchInput.addEventListener('keyup', () => {
      this.params[QUERY_PARAM_KEYS.search] = (
        searchInput as HTMLInputElement
      ).value;

      handler(this.params);
    });
  };

  bindSearchOnChanged = () => {
    const searchInput = document.querySelector('.search-input')!;
    searchInput.addEventListener('change', () => {
      this.params[QUERY_PARAM_KEYS.search] = (
        searchInput as HTMLInputElement
      ).value;

      this.displayCustomersTable(this.params);
    });
  };

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
