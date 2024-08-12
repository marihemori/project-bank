import { Injectable } from '@nestjs/common';
import { Manager } from '../entity/manager.model';
import { CustomerService } from './customer.service';
import { Account } from '../entity/account.model';
import { CheckingAccount } from '../entity/checkingAccount.model';
import { SavingsAccount } from '../entity/savingsAccount.model';

@Injectable()
export class ManagerService {
  private managers: Manager[] = [];

  constructor(private readonly customerService: CustomerService) {}

  // Listar gerentes
  public getAllManagers(): Manager[] {
    console.log(this.managers, 'gerentes');
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

  // Adicionar cliente ao gerente
  public addCustomer(managerId: string, customerId: string): Manager {
    const manager = this.findManager(managerId);

    if (!manager) {
      throw new Error('Gerente não encontrado!');
    }

    const customer = this.customerService.getCustomerById(customerId);
    if (!customer) {
      throw new Error('Cliente não encontrado!');
    }

    manager.addCustomer(customer);
    customer.setManager(manager); // Atualiza o gerente do cliente
    return manager;
  }

  // Remover cliente do gerente
  public removeCustomer(managerId: string, clientId: string): Manager {
    const manager = this.findManager(managerId);
    if (manager) {
      manager.customers = manager.customers.filter(
        (client) => client.getId() !== clientId,
      );
    }
    return manager;
  }

  public openAccount(
    managerId: string,
    clientId: string,
    accountType: typeof CheckingAccount | typeof SavingsAccount,
  ): Account {
    const manager = this.findManager(managerId);
    if (manager) {
      const client = manager.customers.find(
        (client) => client.getId() === clientId,
      );
      if (client) {
        if (accountType === CheckingAccount && client.getIncome() < 500) {
          throw new Error(
            'A renda deve ser de pelo menos R$ 500,00 para abrir uma conta corrente.',
          );
        }
        return client.openAccount(accountType);
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
      const client = manager.customers.find((c) => c.getId() === clientId);
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
    newType: typeof CheckingAccount | typeof SavingsAccount,
  ): Manager {
    const manager = this.findManager(managerId);
    if (manager) {
      const client = manager.customers.find((c) => c.getId() === clientId);
      if (client) {
        const accountIndex = client
          .getAccounts()
          .findIndex((acc) => acc.getId() === accountId);
        if (accountIndex !== -1) {
          let newAccount: Account;
          const oldAccount = client.getAccounts()[accountIndex];
          if (newType === CheckingAccount) {
            newAccount = new CheckingAccount(oldAccount.getBalance(), 500);
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
