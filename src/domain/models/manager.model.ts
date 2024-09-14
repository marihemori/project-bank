import { v4 as uuidv4 } from 'uuid';
import { Client } from './client.model';

export class Manager {
  public id: string;
  public fullname: string;
  public clients: Client[] = [];

  constructor(fullname: string) {
    this.id = uuidv4();
    this.fullname = fullname;
    this.clients = [];
  }

  getId(): string {
    return this.id;
  }

  getFullname(): string {
    return this.fullname;
  }

  getClients(): Client[] {
    return this.clients;
  }

  public addClient(client: Client): void {
    this.clients.push(client);
    console.log('Cliente adicionado');
  }

  public removeCustomer(customerId: string): void {
    this.clients = this.clients.filter(
      (customer) => customer.getId() !== customerId,
    );
    console.log('Cliente removido');
  }
}
