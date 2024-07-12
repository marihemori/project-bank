import { Injectable } from '@nestjs/common';
import { Manager } from '../models/manager.model';
import { Client } from 'src/models/client.model';
import { Account } from 'src/models/account.model';

@Injectable()
export class ManagerService {
  private managers: Manager[] = [];

  // criar um gerente
  createManager(fullname: string): Manager {
    const manager = new Manager(fullname);
    this.managers.push(manager);
    return manager;
  }

  // encontrar um gerente
  findManager(id: string): Manager {
    return this.managers.find((manager) => manager.id === id);
  }

  // adiconar cliente
  addClient(managerId: string, client: Client): Manager {
    const manager = this.managers.find((manager) => manager.id === managerId);
    if (manager) {
      manager.clients.push(client);
    }
    return manager;
  }

  // remover cliente
  removeClient(managerId: string, client: Client): Manager {
    const manager = this.managers.find((manager) => manager.id === managerId);
    if (manager) {
      manager.clients = manager.clients.filter((c) => c.id !== client.id);
    }
    return manager;
  }

  // abrir conta
  openAccount(
    managerId: string,
    client: Client,
    accountType: 'Checking' | 'Savings',
  ): Account {
    const manager = this.managers.find((manager) => manager.id === managerId);
    if (manager) {
      const account = new Account(0, 0, accountType);
      account.accountType = accountType;
      client.accounts.push(account);
      return account;
    }
  }

  // fechar conta
  closeAccount(managerId: string, client: Client, account: Account): Manager {
    const manager = this.managers.find((manager) => manager.id === managerId);
    if (manager) {
      client.accounts = client.accounts.filter((acc) => acc.id !== account.id);
    }
    return manager;
  }

  // muda tipo da conta
  changeAccountType(
    managerId: string,
    client: Client,
    account: Account,
    newType: 'Checking' | 'Savings',
  ): Manager {
    const manager = this.managers.find((manager) => manager.id === managerId);
    if (manager) {
      const accountIndex = client.accounts.findIndex(
        (acc) => acc.id === account.id,
      );
      if (accountIndex !== -1) {
        client.accounts[accountIndex].accountType = newType;
      }
    }
    return manager;
  }
}
