import { Injectable } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { BoletoPayment } from 'src/models/boletoPayment.model';
import { PixPayment } from 'src/models/pixPayment.model';
import { CheckingAccount } from 'src/models/checkingAccount.model';
import { SavingsAccount } from 'src/models/savingsAccount.model';
import { Manager } from 'src/models/manager.model';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];

  // Listar todos os clientes
  public getAllCustomers(): Customer[] {
    return this.customers;
  }

  // Listar um único cliente
  public getCustomerById(id: string): Customer {
    const customer = this.customers.find((customer) => customer.getId() === id);
    if (!customer) {
      throw new Error('Cliente não encontrado!');
    }
    return customer;
  }

  // Abrir uma conta
  public openAccount(
    fullName: string,
    address: string,
    phone: string,
    income: number,
    accountType: typeof CheckingAccount | typeof SavingsAccount,
    manager: Manager,
  ): Customer {
    const customer = new Customer(fullName, address, phone, income, manager);
    customer.openAccount(accountType);
    this.customers.push(customer);
    return customer;
  }

  // Mudar tipo de conta
  public changeAccountType(
    customerId: string,
    accountId: string,
    newType: typeof CheckingAccount | typeof SavingsAccount,
  ): Customer {
    try {
      const customer = this.getCustomerById(customerId);
      if (!customer) {
        throw new Error('Cliente não encontrado!');
      }

      const account = customer
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      if (!account) {
        throw new Error('Conta não encontrada!');
      }

      customer.changeAccountType(account, newType);
      return customer;
    } catch (error) {
      console.log('Houve um erro ao mudar o tipo da conta:', error);
      throw new Error('Houve um erro ao mudar o tipo da conta');
    }
  }

  // Pagar boleto
  public payBoleto(
    customerId: string,
    accountId: string,
    amount: number,
    boletoNumber: string,
  ): void {
    const customer = this.customers.find(
      (customer) => customer.getId() === customerId,
    );
    if (customer) {
      const account = customer
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

  // Pagar pix
  public payPix(
    customerId: string,
    accountId: string,
    amount: number,
    pixKey: string,
  ): void {
    const customer = this.customers.find(
      (customer) => customer.getId() === customerId,
    );
    if (customer) {
      const account = customer
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

  // Fechar uma conta
  public closeAccount(customerId: string, accountId: string): Customer {
    try {
      const customer = this.getCustomerById(customerId);
      if (!customer) {
        throw new Error('Cliente não encontrado!');
      }
      const account = customer
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      if (!account) {
        throw new Error('Conta não encontrada!');
      }
      customer.closeAccount(account);
      return customer;
    } catch (error) {
      console.log('Houve um erro ao fechar a conta:', error);
    }
  }

  //Deletar um cliente
  public deleteClient(customerId: string): void {
    this.customers = this.customers.filter(
      (customer) => customer.getId() !== customerId,
    );
  }
}
