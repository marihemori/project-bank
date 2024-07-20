import { Injectable } from '@nestjs/common';
import { Manager } from '../models/manager.model';
import { Client } from 'src/models/client.model';
import { Account } from 'src/models/account.model';
import { CheckingAccount } from 'src/models/checkingAccount.model';
import { SavingsAccount } from 'src/models/savingsAccount.model';

@Injectable()
export class ManagerService {
  private managers: Manager[] = [];

  // Listar gerentes
  public getAllManagers(): Manager[] {
    return this.managers;
  }

  // Listar um único gerente
  public getManagerById(managerId: string): Manager {
    const manager = this.managers.find(
      (manager) => manager.getId() === managerId,
    );
    if (!manager) {
      throw new Error('Gerente não encontrado!');
    }
    return manager;
  }

  // criar um gerente
  public createManager(fullname: string): Manager {
    const manager = new Manager(fullname);
    this.managers.push(manager);
    return manager;
  }

  // encontrar um gerente
  public findManager(id: string): Manager {
    return this.managers.find((manager) => manager.getId() === id);
  }

  // adicionar cliente
  public addClient(
    managerId: string,
    fullName: string,
    address: string,
    phone: string,
    income: number,
    accountType: 'Checking' | 'Savings',
  ): Manager {
    const manager = this.findManager(managerId);
    if (manager) {
      const client = new Client(
        fullName,
        address,
        phone,
        income,
        accountType,
        manager,
      );
      manager.clients.push(client);
    }
    return manager;
  }

  // remover cliente
  public removeClient(managerId: string, clientId: string): Manager {
    const manager = this.findManager(managerId);
    if (manager) {
      manager.clients = manager.clients.filter(
        (client) => client.getId() !== clientId,
      );
    }
    return manager;
  }

  // abrir conta
  public openAccount(
    managerId: string,
    clientId: string,
    accountType: 'Checking' | 'Savings',
  ): Account {
    const manager = this.findManager(managerId);
    if (manager) {
      const client = manager.clients.find(
        (client) => client.getId() === clientId,
      );
      if (client) {
        let account: Account;
        if (accountType === 'Checking') {
          account = new CheckingAccount(0, 500);
        } else {
          account = new SavingsAccount(0, 0, 0.01);
        }
        client.createAccount(accountType);
        return account;
      } else {
        throw new Error('Cliente não encontrado!');
      }
    } else {
      throw new Error('Gerente não encontrado!');
    }
  }

  // fechar conta
  public closeAccount(
    managerId: string,
    clientId: string,
    accountId: string,
  ): Manager {
    const manager = this.findManager(managerId);
    if (manager) {
      const client = manager.clients.find((c) => c.getId() === clientId);
      if (client) {
        const account = client
          .getAccounts()
          .find((acc) => acc.getId() === accountId);
        if (account) {
          client.closeAccount(account);
        } else {
          throw new Error('Conta não encontrada!');
        }
      } else {
        throw new Error('Cliente não encontrado');
      }
    } else {
      throw new Error('Gerente não encontrado');
    }
    return manager;
  }

  // muda tipo da conta
  public changeAccountType(
    managerId: string,
    clientId: string,
    accountId: string,
    newType: 'Checking' | 'Savings',
  ): Manager {
    const manager = this.findManager(managerId);
    if (manager) {
      const client = manager.clients.find((c) => c.getId() === clientId);
      if (client) {
        const accountIndex = client
          .getAccounts()
          .findIndex((acc) => acc.getId() === accountId);
        if (accountIndex !== -1) {
          let newAccount: Account;
          const oldAccount = client.getAccounts()[accountIndex];
          if (newType === 'Checking') {
            newAccount = new CheckingAccount(oldAccount.getBalance(), 500); // Exemplo de cheque especial padrão
          } else {
            newAccount = new SavingsAccount(
              oldAccount.getBalance(),
              oldAccount.getOverdraft(),
              0.01,
            );
          }
          client.getAccounts()[accountIndex] = newAccount;
        }
      }
    }
    return manager;
  }
}
