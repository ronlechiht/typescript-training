//Build query string from params
export function buildQueryString<T>(params: T): string {
  let queryString = '?';
  if (params) {
    const urlParams = new URLSearchParams();
    for (const key in params) {
      urlParams.append(key, String(params[key as keyof T]));
    }
    queryString = queryString + urlParams;
  }

  return queryString;
}
