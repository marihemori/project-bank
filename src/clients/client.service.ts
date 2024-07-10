import { Injectable } from '@nestjs/common';
import { Client } from './client.entity';
import { Manager } from 'src/managers/manager.entity';
import { Account } from 'src/accounts/account.entity';
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
    const user = this.clients.find((client) =>
      client.accounts.includes(account),
    );
    if (user) {
      client.accounts = client.accounts.filter((acc) => acc !== account);
    }
  }

  changeAccountType(account: Account, newType: 'Checking' | 'Savings') {
    const client = this.clients.find((client) =>
      client.accounts.includes(account),
    );
    client.accountType = newType;
  }
}
