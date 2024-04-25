import { Customer } from '../types/customerType';
import { renderDropDownMenuContainer } from './dropDownTemplate';

function renderStatus(status: string): string {
  if (status === 'on') return `<p class="status-tag status-active">Active</p>`;
  return `<p class="status-tag">Inactive</p>`;
}

function renderCustomer(customer: Customer): string {
  const cells = Object.keys(customer).map((key: string) => {
    if (key === 'id') return;
    if (key === 'status') return renderStatus(customer[key]);
    return `<p class="${key}-cell">${customer[key as keyof Customer]}</p>`;
  });

  return cells.join('');
}

export function renderCustomersList(customers: Customer[] | string): string {
  const rows = Object.values(customers).map((customer) => {
    return `
    <li class="customer" id="${customer['id']}"}>${renderCustomer(customer) + renderDropDownMenuContainer()}</li>
    <div class="customer-divider"></div>
    `;
  });

  return `
    <ul class="table-body">
      ${rows.join('')}
    </ul>
  `;
}
