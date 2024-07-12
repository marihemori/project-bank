import { Injectable } from '@nestjs/common';
import { Client } from '../models/client.model';
import { Manager } from '../models/manager.model';
import { Account } from '../models/account.model';

@Injectable()
export class ClientService {
  private clients: Client[] = [];

  getAllClients(): Client[] {
    return this.clients;
  }

  openAccount(
    fullName: string,
    address: string,
    phone: string,
    income: number,
    accountType: 'Checking' | 'Savings',
    manager: Manager,
  ): Client {
    const client = new Client(
      fullName,
      address,
      phone,
      income,
      accountType,
      manager,
    );
    this.clients.push(client);
    return client;
  }

  closeAccount(client: Client, account: Account): void {
    client.closeAccount(account);
  }

  changeAccountType(
    client: Client,
    account: Account,
    newType: 'Checking' | 'Savings',
  ) {
    client.changeAccountType(account, newType);
  }
}
