import { Inject, Injectable } from '@nestjs/common';
import { Manager } from '../models/manager.model';
import { ClientService } from './client.service';
import { Account } from '../models/account.model';
import { CheckingAccount } from '../models/checkingAccount.model';
import { SavingsAccount } from '../models/savingsAccount.model';
import { Client } from '../models/client.model';
import { ManagerRepository } from 'src/infrastructure/repositories/manager.repository';
import { ManagerEntity } from '../entity/manager.entity';

@Injectable()
export class ManagerService {
  // private managers: Manager[] = [];
  public managers: ManagerEntity[] = [];

  constructor(
    private readonly clientService: ClientService,

    @Inject('IManagerRepository')
    private readonly managersRepository: ManagerRepository,
  ) {}

  // Listar gerentes
  public getAllManagers(): Promise<ManagerEntity[]> {
    const manager = this.managersRepository.findAll();
    if (manager == null) {
      throw new Error('Gerente não encontrado!');
    }
    return manager;
  }

  // Listar um único gerente
  public getManagerById(managerId: string): Promise<ManagerEntity> {
    const manager = this.managersRepository.findById(managerId);

    if (manager == null) {
      throw new Error('Gerente não encontrado!');
    }
    return manager;
  }

  // criar um gerente
  public async createManager(fullname: string): Promise<ManagerEntity> {
    const manager = new Manager(fullname);
    this.managers.push(manager);
    await this.managersRepository.create(manager);
    return manager;
  }

  // encontrar um gerente
  public findManager(id: string): Manager {
    return this.managers.find((manager) => manager.getId() === id);
  }

  // Gerente abre uma conta para o cliente
  public async openAccount(
    fullname: string,
    address: string,
    phone: string,
    income: number,
    accountType: typeof CheckingAccount | typeof SavingsAccount,
    managerId: string,
  ): Promise<Client> {
    // Encontrar um gerente
    const manager = this.managersRepository.findById(managerId);
    if (manager == null || manager == undefined) {
      throw new Error('Gerente não encontrado!');
    }

    // Verificar se a renda é suficiente para abrir uma conta corrente
    if (accountType === CheckingAccount && income < 500) {
      throw new Error(
        'A renda deve ser de pelo menos R$ 500,00 para abrir uma conta corrente.',
      );
    }

    //cria um novo cliente
    const customer = new Client(fullname, address, phone, income, managerId);

    console.log(customer);
    // Adiciona o cliente à lista de clientes usando o serviço
    this.customerService.addCustomer(customer);

    // adiciona o cliente a lista de clientes do gerente
    manager.adicionarGerente(customer);

    customer.openAccount(accountType);

    return null;
  }

  // Adicionar cliente ao gerente
  public addClient(managerId: string, clientId: string): Promise<Manager> {
    const manager = null;

    if (!manager) {
      throw new Error('Gerente não encontrado!');
    }

    const customer = this.clientService.getClientById(clientId);
    if (!customer) {
      throw new Error('Cliente não encontrado!');
    }

    manager.addCustomer(customer);
    customer.setManager(manager); // Atualiza o gerente do cliente
    return manager;
  }

  // Remover cliente do gerente
  public removeClient(managerId: string, clientId: string): Manager {
    const manager = null;
    if (manager) {
      manager.clients = manager.clients.filter(
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
    const manager = null;
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
    return null;
  }

  // muda tipo da conta
  public changeAccountType(
    managerId: string,
    clientId: string,
    accountId: string,
    newType: typeof CheckingAccount | typeof SavingsAccount,
  ): Manager {
    const manager = null;
    if (manager) {
      const client = manager.clients.find((c) => c.getId() === clientId);
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
    return null;
  }
}
