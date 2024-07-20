import { v4 as uuidv4 } from 'uuid';
import { Client } from 'src/models/client.model';

export class Manager {
  private id: string;
  private fullName: string;
  public clients: Client[];

  constructor(fullname: string) {
    this.id = uuidv4();
    this.fullName = fullname;
    this.clients = [];
  }

  getId(): string {
    return this.id;
  }

  getFullName(): string {
    return this.fullName;
  }

  public addClient(client: Client): void {
    this.clients.push(client);
    console.log('Cliente adicionado');
  }

  public removeClient(clientId: string): void {
    this.clients = this.clients.filter((client) => client.getId() !== clientId);
    console.log('Cliente removido');
  }
}
