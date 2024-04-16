import { buildQueryString } from '../utils/buildQueryString';
import { Customer } from '../types/customerType';
import { GeneralInformation } from '../types/generalInformationType';
import { QueryParams } from '../types/queryParamsType';

export class HttpService<Type> {
  constructor(private baseAPI: string) {}

  async request(
    path: string,
    method: string,
    data?: Type,
  ): Promise<Customer[]> {
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

  get(
    params?: QueryParams,
  ): Promise<Customer[] | GeneralInformation[] | string> {
    let path: string = this.baseAPI;
    if (params) {
      const queryString: string = buildQueryString(params);
      path = this.baseAPI + queryString;
    }

    return this.request(path, 'GET');
  }

  async post(data: Type): Promise<void> {
    await this.request(this.baseAPI, 'POST', data);
  }

  async put(id: string, data: Type): Promise<void> {
    const path = `${this.baseAPI}/${id}`;
    await this.request(path, 'PUT', data);
  }

  async delete(id: string): Promise<void> {
    const path = `${this.baseAPI}/${id}`;
    await this.request(path, 'DELETE');
  }
}
