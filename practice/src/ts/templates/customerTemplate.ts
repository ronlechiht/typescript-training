import { Customer } from '../types/customerType';
import { genDropDownMenuContainer } from './dropDownTemplate';

function genStatus(status: string): string {
  if (status === 'on') return `<p class="status-tag status-active">Active</p>`;
  return `<p class="status-tag">Inactive</p>`;
}

function genCustomer(customer: Customer): string {
  const cells = Object.keys(customer).map((key: string) => {
    if (key === 'id') return;
    if (key === 'status') return genStatus(customer[key]);
    return `<p class="${key}-cell">${customer[key as keyof Customer]}</p>`;
  });

  return cells.join('');
}

export function genCustomersList(customers: object | string): string {
  const rows = Object.values(customers).map((customer) => {
    return `
    <li class="customer" id="${customer['id']}"}>${genCustomer(customer) + genDropDownMenuContainer()}</li>
    <div class="customer-divider"></div>
    `;
  });

  return `
    <ul class="table-body">
      ${rows.join('')}
    </ul>
  `;
}
