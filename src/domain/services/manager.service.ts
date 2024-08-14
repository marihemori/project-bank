import { Injectable } from '@nestjs/common';
import { Manager } from '../models/manager.model';
import { CustomerService } from './customer.service';
import { Account } from '../models/account.model';
import { CheckingAccount } from '../models/checkingAccount.model';
import { SavingsAccount } from '../models/savingsAccount.model';
import { Customer } from '../models/customer.model';

@Injectable()
export class ManagerService {
  private managers: Manager[] = [];
  private customers: Customer[] = [];

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

  // Gerente abre uma conta para o cliente
  public openAccount(
    fullname: string,
    address: string,
    phone: string,
    income: number,
    accountType: typeof CheckingAccount | typeof SavingsAccount,
    managerId: string,
  ): Customer {
    // Encontrar um gerente
    const manager = this.findManager(managerId);
    if (!manager) {
      throw new Error('Gerente não encontrado!');
    }

    // Verificar se a renda é suficiente para abrir uma conta corrente
    if (accountType === CheckingAccount && income < 500) {
      throw new Error(
        'A renda deve ser de pelo menos R$ 500,00 para abrir uma conta corrente.',
      );
    }

    // cria um novo cliente
    const customer = new Customer(fullname, address, phone, income, manager);

    // Adiciona o cliente à lista de clientes usando o serviço
    this.customerService.addCustomer(customer);

    // adiciona o cliente a lista de clientes do gerente
    manager.addCustomer(customer);

    customer.openAccount(accountType);

    return customer;
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
    customerId: string,
    accountId: string,
    newType: typeof CheckingAccount | typeof SavingsAccount,
  ): Manager {
    const manager = this.findManager(managerId);
    if (manager) {
      const customer = manager.customers.find((c) => c.getId() === customerId);
      if (customer) {
        const accountIndex = customer
          .getAccounts()
          .findIndex((acc) => acc.getId() === accountId);
        if (accountIndex !== -1) {
          let newAccount: Account;
          const oldAccount = customer.getAccounts()[accountIndex];
          if (newType === CheckingAccount) {
            newAccount = new CheckingAccount(oldAccount.getBalance(), 500);
          } else {
            newAccount = new SavingsAccount(
              oldAccount.getBalance(),
              oldAccount.getOverdraft(),
              0.01,
            );
          }
          customer.getAccounts()[accountIndex] = newAccount;
        }
      }
    }
    return manager;
  }
}
