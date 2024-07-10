import { v4 as uuidv4 } from 'uuid';
import { Client } from 'src/clients/client.entity';

export class Manager {
  public id: string;
  public fullName: string;
  public clients: Client[] = [];

  constructor(fullname: string) {
    this.id = uuidv4();
    this.fullName = fullname;
    this.clients = [];
  }
}
