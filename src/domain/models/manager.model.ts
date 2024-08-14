import { v4 as uuidv4 } from 'uuid';
import { Customer } from './customer.model';

export class Manager {
  private id: string;
  private fullname: string;
  public customers: Customer[] = [];

  constructor(fullname: string) {
    this.id = uuidv4();
    this.fullname = fullname;
    this.customers = [];
  }

  getId(): string {
    return this.id;
  }

  getFullname(): string {
    return this.fullname;
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  public addCustomer(customer: Customer): void {
    this.customers.push(customer);
    console.log('Cliente adicionado');
  }

  public removeCustomer(customerId: string): void {
    this.customers = this.customers.filter(
      (customer) => customer.getId() !== customerId,
    );
    console.log('Cliente removido');
  }
}
