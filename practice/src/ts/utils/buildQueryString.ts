import { QueryParams } from '../types/queryParamsType';

//Build query string from params(search, sort, pagination value)
export function buildQueryString(params: QueryParams): string {
  let queryString = '?';
  if (params) {
    const urlParams = new URLSearchParams();
    for (const key in params) {
      urlParams.append(key, params[key]);
    }
    queryString = queryString + urlParams;
  }

  return queryString;
}
