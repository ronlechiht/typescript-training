//Import
import { CUSTOMERS_API, QUERY_PARAM_KEYS } from '../constants/constants';
import { HttpService } from '../services/httpServices';
import { genTable } from '../templates/tableTemplate';
import { QueryParams } from '../types/queryParamsType';
import { CustomerFormData } from '../types/formDataType';
import { debounce } from '../utils/debounce';

export class CustomerView {
  customerService: HttpService<CustomerFormData>;
  params: QueryParams;

  constructor() {
    this.customerService = new HttpService<CustomerFormData>(CUSTOMERS_API);
    this.params = {
      [QUERY_PARAM_KEYS.page]: 1,
      [QUERY_PARAM_KEYS.limit]: 8,
      [QUERY_PARAM_KEYS.sort]: 'id',
      [QUERY_PARAM_KEYS.order]: 'desc',
    };

    this.bindPagination();
    this.bindSearchDebounce(debounce(this.displayCustomersTable));
    this.bindSearchOnChanged();
  }

  displayCustomersTable = async (params: QueryParams): Promise<void> => {
    const customersTable = document.querySelector('.customers-table-body')!;
    try {
      const customers = await this.customerService.get(params);

      if (!Object.keys(customers).length || customers === 'Not found') {
        customersTable.innerHTML = `
        <p class="message-empty">There are no customers in the list</p>
        `;
        return;
      }

      customersTable.innerHTML = genTable(customers, params);
    } catch (error) {
      console.log(error);
    }
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

  bindSearchDebounce = (handler) => {
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
}
