import {
  CUSTOMER_TABLE_HEADING,
  QUERY_PARAM_KEYS,
} from '../constants/constants';
import { renderCustomersList } from './customerTemplate';
import { QueryParams } from '../types/queryParamsType';
import { Customer } from '../types/customerType';

function renderTableHeader(CUSTOMER_TABLE_HEADING: string[]): string {
  const headings = CUSTOMER_TABLE_HEADING.map((heading) => {
    return `
      <h4 class="table-heading">${heading}</h4>
    `;
  });
  return `
    <div class="table-header">
      ${headings.join('')}
    </div>
  `;
}

function renderTableFooter(
  firstRecord: number,
  lastRecord: number,
  pageSize: number,
): string {
  let disablePrevious: string;
  let disableNext: string;

  if (firstRecord === 1) {
    disablePrevious = 'disabled';
  } else {
    disablePrevious = '';
  }

  //Disable next btn at last page
  if (lastRecord - firstRecord + 1 < pageSize) {
    disableNext = 'disabled';
  } else {
    disableNext = '';
  }
  return `
    <div class="table-footer">
      <p class="message-showing-data">Showing data ${firstRecord} to ${lastRecord}</p>
      <div class="btn-pagination">
        <button class="btn-pagination-previous" ${disablePrevious}>&lt;</button>
        <button class="btn-pagination-next" ${disableNext}>&gt;</button>
      </div>
    </div>
  `;
}

export function renderTable(
  customers: Customer[] | string,
  params: QueryParams,
): string {
  if (!Object.keys(customers).length || customers === 'Not found') {
    return `
        <p class="message-empty">There are no customers in the list</p>
        `;
  }

  const firstRecord = (Number(params.page) - 1) * Number(params.limit) + 1;
  const lastRecord =
    (Number(params.page) - 1) * Number(params.limit) +
    Object.keys(customers).length;

  return `
    ${renderTableHeader(CUSTOMER_TABLE_HEADING)}
    ${renderCustomersList(customers)}
    ${renderTableFooter(firstRecord, lastRecord, params[QUERY_PARAM_KEYS.limit])}
  `;
}
