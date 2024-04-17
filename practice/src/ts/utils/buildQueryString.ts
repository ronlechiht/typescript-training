import { QueryParams } from '../types/queryParamsType';

//Build query string from params(search, sort, pagination value)
export function buildQueryString(params: QueryParams): string {
  let queryString = '?';
  if (params) {
    const urlParams = new URLSearchParams();
    for (const key in params) {
      urlParams.append(key, String(params[key as keyof QueryParams]));
    }
    queryString = queryString + urlParams;
  }

  return queryString;
}
