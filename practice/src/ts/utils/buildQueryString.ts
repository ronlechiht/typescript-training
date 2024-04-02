//Build query string form params(search, sort, pagination value)
export function buildQueryString(params: Record<string, string>): string {
  let queryString = '?';
  if (params) {
    const urlParams = new URLSearchParams(params);
    queryString = queryString + urlParams;
  }

  return queryString;
}
