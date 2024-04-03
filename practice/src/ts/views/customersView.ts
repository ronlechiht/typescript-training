//Import
import { CUSTOMERS_API } from '../constants/constants';
import { HttpService } from '../services/httpServices';
import { genTable } from '../templates/tableTemplate';
import { Customer } from '../types/customerType';
import { QueryParams } from '../types/queryParamsType';
import { CustomerFormData } from '../types/formDataType';

//Get HTML element

const customerService = new HttpService<CustomerFormData>(CUSTOMERS_API);

//Get customers list from API
async function getCustomersList(params: QueryParams): Promise<Customer[]> {
  return customerService.get(params);
}

//Render customers table
export async function displayCustomersTable(
  params: QueryParams,
): Promise<void> {
  const customersTable = document.querySelector('.customers-table-body')!;
  try {
    const customers = await getCustomersList(params);

    if (!Object.keys(customers).length) {
      customersTable.innerHTML = `
        <p class="message-empty">There are no customers in the list</p>
        `;
      return;
    }

    customersTable.innerHTML = genTable(customers, params);
  } catch (error) {
    console.log(error);
  }
}
