import { buildQueryString } from '../utils/buildQueryString';
import { FormData } from '../types/formDataType';

export class HttpService {
  static async request(
    path: string,
    method: string,
    data?: FormData,
  ): Promise<Response> {
    return fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(data && {
        body: JSON.stringify(data),
      }),
    }).then((value) => value.json());
  }

  static async get(
    path: string,
    params: Record<string, string>,
  ): Promise<Response> {
    if (params) {
      const queryString: string = buildQueryString(params);
      path = path + queryString;
    }

    return this.request(path, 'GET');
  }

  static async post(path: string, data: FormData): Promise<void> {
    await this.request(path, 'POST', data);
  }

  static async put(id: string, path: string, data: FormData): Promise<void> {
    path = `${path}/${id}`;
    await this.request(path, 'PUT', data);
  }

  static async delete(id: string, path: string): Promise<void> {
    path = `${path}/${id}`;
    await this.request(path, 'DELETE');
  }
}
