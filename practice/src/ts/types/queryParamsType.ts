import { QUERY_PARAM_KEYS } from '../constants/constants';

export interface QueryParams {
  [QUERY_PARAM_KEYS.page]: number;
  [QUERY_PARAM_KEYS.limit]: number;
  [QUERY_PARAM_KEYS.search]?: string;
  [QUERY_PARAM_KEYS.sort]: string;
  [QUERY_PARAM_KEYS.order]: string;
}
