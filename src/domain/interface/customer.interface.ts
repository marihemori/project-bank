import { CustomerEntity } from '../entity/customer.entity';

export interface ICustomerRepository {
  findAll(): Promise<CustomerEntity[]>;
  findById(id: string): Promise<CustomerEntity> | null;
  save(customer: CustomerEntity): Promise<CustomerEntity>;
  update(id: string, customer: CustomerEntity): Promise<CustomerEntity>;
  delete(id: string): Promise<boolean>;
}
