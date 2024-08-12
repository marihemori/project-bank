import { Customer } from '../entity/customer.entity';

export interface ICustomerRepository {
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer> | null;
  save(customer: Customer): Promise<Customer>;
  delete(id: string): Promise<boolean>;
}
