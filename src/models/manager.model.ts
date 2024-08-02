import { v4 as uuidv4 } from 'uuid';
import { Customer } from 'src/models/customer.model';

export class Manager {
  private id: string;
  private fullName: string;
  public customers: Customer[] = [];

  constructor(fullname: string) {
    this.id = uuidv4();
    this.fullName = fullname;
    this.customers = [];
  }

  getId(): string {
    return this.id;
  }

  getFullName(): string {
    return this.fullName;
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
