import { Injectable } from '@nestjs/common';
import { Client } from '../models/client.model';
import { ManagerService } from './manager.service';
import { BoletoPayment } from 'src/models/boletoPayment.model';
import { PixPayment } from 'src/models/pixPayment.model';
import { CheckingAccount } from 'src/models/checkingAccount.model';
import { SavingsAccount } from 'src/models/savingsAccount.model';
import { Manager } from 'src/models/manager.model';

@Injectable()
export class ClientService {
  private clients: Client[] = [];

  constructor(private readonly managerService: ManagerService) {}

  // Listar todos os clientes
  public getAllClients(): Client[] {
    return this.clients;
  }

  // Listar um único cliente
  public getClientById(clientId: string): Client {
    const client = this.clients.find((client) => client.getId() === clientId);
    if (!client) {
      throw new Error('Cliente não encontrado!');
    }
    return client;
  }

  // Encontrar cliente por ID
  private findClientById(clientId: string): Client | undefined {
    return this.clients.find((client) => client.getId() === clientId);
  }

  public openAccount(
    fullName: string,
    address: string,
    phone: string,
    income: number,
    accountType: typeof CheckingAccount | typeof SavingsAccount,
    managerId?: string,
  ): Client {
    let manager: Manager;
    if (managerId) {
      manager = this.managerService.findManager(managerId);
      if (!manager) {
        throw new Error('Gerente não encontrado!');
      }
    }

    const client = new Client(fullName, address, phone, income, manager);
    client.openAccount(accountType);
    this.clients.push(client);
    return client;
  }

  // Fechar conta
  public closeAccount(clientId: string, accountId: string): Client {
    const client = this.getClientById(clientId);
    if (client) {
      const account = client
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      if (account) {
        client.closeAccount(account);
        return client;
      } else {
        throw new Error('Conta não encontrada!');
      }
    } else {
      throw new Error('Cliente não encontrado!');
    }
  }

  // Mudar tipo de conta
  public changeAccountType(
    clientId: string,
    accountId: string,
    newType: typeof CheckingAccount | typeof SavingsAccount,
  ): Client {
    const client = this.getClientById(clientId);
    if (client) {
      const account = client
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      if (account) {
        client.changeAccountType(account, newType);
        return client;
      } else {
        throw new Error('Conta não encontrada!');
      }
    } else {
      throw new Error('Cliente não encontrado!');
    }
  }

  public payBoleto(
    clientId: string,
    accountId: string,
    amount: number,
    boletoNumber: string,
  ): void {
    const client = this.clients.find((client) => client.getId() === clientId);
    if (client) {
      const account = client
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      if (account) {
        const payment = new BoletoPayment(
          amount,
          new Date(),
          boletoNumber,
          account,
        );
        payment.processPayment();
      } else {
        throw new Error('Conta não encontrada!');
      }
    } else {
      throw new Error('Cliente não encontrado!');
    }
  }

  public payPix(
    clientId: string,
    accountId: string,
    amount: number,
    pixKey: string,
  ): void {
    const client = this.clients.find((client) => client.getId() === clientId);
    if (client) {
      const account = client
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      if (account) {
        const payment = new PixPayment(amount, new Date(), pixKey, account);
        payment.processPayment();
      } else {
        throw new Error('Conta não encontrada!');
      }
    } else {
      throw new Error('Cliente não encontrado!');
    }
  }
}
