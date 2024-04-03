import { CUSTOMER_TABLE_HEADING } from '../constants/constants';
import { genCustomersList } from './customerTemplate';
import { QueryParams } from '../types/queryParamsType';

function genTableHeader(CUSTOMER_TABLE_HEADING: string[]): string {
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

function genTableFooter(firstRecord: number, lastRecord: number): string {
  return `
    <div class="table-footer">
      <p class="message-showing-data">Showing data ${firstRecord} to ${lastRecord}</p>
      <div class="btn-pagination">
        <button class="btn-pagination-previous">&lt;</button>
        <button class="btn-pagination-next">&gt;</button>
      </div>
    </div>
  `;
}

export function genTable(customers: object, params: QueryParams): string {
  const firstRecord = (Number(params.page) - 1) * Number(params.limit) + 1;
  const lastRecord =
    (Number(params.page) - 1) * Number(params.limit) +
    Object.keys(customers).length;

  return `
    ${genTableHeader(CUSTOMER_TABLE_HEADING)}
    ${genCustomersList(customers)}
    ${genTableFooter(firstRecord, lastRecord)}
  `;
}
