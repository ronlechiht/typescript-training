import { CUSTOMERS_API } from '../constants/constants';
import { Customer } from '../types/customerType';
import { CustomerFormData } from '../types/formDataType';
import { QueryParams } from '../types/queryParamsType';
import { HttpService } from './httpServices';

export class CustomerService {
  service = new HttpService(CUSTOMERS_API);

  async getCustomer(params: QueryParams) {
    return this.service.get<Customer[]>(params);
  }

  async addCustomer(data: CustomerFormData) {
    return this.service.post<CustomerFormData, Customer[]>(data);
  }

  async updateCustomer(data: CustomerFormData, id: string) {
    return this.service.put<CustomerFormData, Customer[]>(data, id);
  }

  async removeCustomer(id: string) {
    return this.service.delete<Customer[]>(id);
  }
}
