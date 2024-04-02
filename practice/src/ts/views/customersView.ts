//Import
import { CUSTOMERS_API } from '../constants/constants';
import { HttpService } from '../services/httpServices';
import { genTable } from '../templates/tableTemplate';

//Get HTML element
const customersTable = document.querySelector('.customers-table-body')!;

const customerService = new HttpService<FormData>(CUSTOMERS_API);

//Get customers list from API
async function getCustomersList(
  params: Record<string, string>,
): Promise<object> {
  return customerService.get(params);
}

//Render customers table
export async function displayCustomersTable(
  params: Record<string, string>,
): Promise<void> {
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
