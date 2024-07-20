import { Injectable } from '@nestjs/common';
import { Client } from '../models/client.model';
import { ManagerService } from './manager.service';
import { BoletoPayment } from 'src/models/boletoPayment.model';
import { PixPayment } from 'src/models/pixPayment.model';

@Injectable()
export class ClientService {
  private clients: Client[] = [];

  constructor(private readonly managerService: ManagerService) {}

  // Listar cliente
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

  public openAccount(
    fullName: string,
    address: string,
    phone: string,
    income: number,
    managerId?: string,
  ): Client {
    let manager;
    if (managerId) {
      manager = this.managerService.findManager(managerId);
      if (!manager) {
        throw new Error('Gerente não encontrado!');
      }
    }
    const client = new Client(fullName, address, phone, income, manager);
    this.clients.push(client);

    return client;
  }

  public closeAccount(clientId: string, accountId: string): Client {
    const client = this.clients.find((client) => client.getId() === clientId);
    if (client) {
      const account = client
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      client.closeAccount(account);
      return client;
    } else {
      throw new Error('Cliente não encontrado!');
    }
  }

  public changeAccountType(
    clientId: string,
    accountId: string,
    newType: 'Checking' | 'Savings',
  ): Client {
    const client = this.clients.find((client) => client.getId() === clientId);
    if (client) {
      const account = client
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      client.changeAccountType(account, newType);
      return client;
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
