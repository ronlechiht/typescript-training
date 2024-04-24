import { buildQueryString } from '../utils/buildQueryString';
import { QueryParams } from '../types/queryParamsType';

export class HttpService {
  constructor(private baseAPI: string) {}

  async request<T, U>(path: string, method: string, data?: T): Promise<U> {
    const res = await fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(data && {
        body: JSON.stringify(data),
      }),
    });
    return res.json();
  }

  get<U>(params?: QueryParams): Promise<U | string> {
    let path: string = this.baseAPI;
    if (params) {
      const queryString: string = buildQueryString<QueryParams>(params);
      path = this.baseAPI + queryString;
    }

    return this.request(path, 'GET');
  }

  async post<T, U>(data: T): Promise<U | string> {
    return this.request(this.baseAPI, 'POST', data);
  }

  async put<T, U>(data: T, id: string): Promise<U | string> {
    const path = `${this.baseAPI}/${id}`;
    return this.request(path, 'PUT', data);
  }

  async delete<U>(id: string): Promise<U | string> {
    const path = `${this.baseAPI}/${id}`;
    return this.request(path, 'DELETE');
  }
}
