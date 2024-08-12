import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Account } from '../entity/account.model';
import { Customer } from '../entity/customer.model';
import { CustomerService } from './customer.service';

@Injectable()
export class AccountService {
  private accounts: Account[] = [];
  private customers: Customer[] = [];

  constructor(
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
  ) {}

  // Encontrar conta pelo id
  public getAccountById(accountId: string): Account {
    // console.log(`Conta encontrada: ${accountId}`);
    // return this.accounts.find((account) => account.getId() === accountId);
    const account = this.accounts.find(
      (account) => account.getId() === accountId,
    );
    // console.log(this.accounts);
    if (!account) {
      throw new Error('Conta não encontrada!');
    }
    return account;
  }

  // Verificar saldo
  public verifyBalance(customerId: string, accountId: string): any {
    const customer = this.customerService.getCustomerById(customerId);
    if (!customer) {
      throw new Error('Cliente não encontrado!');
    }

    const account = customer
      .getAccounts()
      .find((acc) => acc.getId() === accountId);
    // console.log(account);

    if (!account) {
      throw new Error('Conta não encontrada!');
    }
    // console.log(`Saldo da conta ${accountId}: ${account.getBalance()}`);
    return account; // Retorna o objeto Account
  }

  // Adicionar conta
  public addAccount(account: Account): void {
    this.accounts.push(account);
  }

  // depositar
  public deposit(accountId: string, customerId: string, amount: number): void {
    const customer = this.customerService.getCustomerById(customerId);
    if (!customer) {
      throw new Error('Cliente não encontrado!');
    }

    const account = customer
      .getAccounts()
      .find((acc) => acc.getId() === accountId);
    // console.log(account);

    if (!account) {
      throw new Error('Conta não encontrada!');
    }

    // console.log(`Depositando ${amount} na conta ${accountId}`);
    account.deposit(amount);
    // console.log(`Novo saldo: ${account.getBalance()}`);
  }

  // sacar
  public withdraw(accountId: string, customerId: string, amount: number): void {
    const customer = this.customerService.getCustomerById(customerId);
    if (!customer) {
      throw new Error('Cliente não encontrado!');
    }

    const account = customer
      .getAccounts()
      .find((acc) => acc.getId() === accountId);
    console.log(account);
    if (!account) {
      throw new Error('Conta não encontrada!');
    }

    const newBalance = account.getBalance() - amount;
    if (newBalance < 0) {
      throw new Error('Saldo insuficiente para saque!');
    } else {
      account.setBalance(newBalance);
    }
  }

  // transferir
  public transfer(
    fromAccountId: string, // id da conta de origem
    toAccountId: string, // id da conta de destino
    customerIdFrom: string, // id do cliente de origem
    customerIdTo: string, // id do cliente de destino
    amount: number, // valor da transferência
  ): { fromAccount: Account; toAccount: Account } {
    // obter o cliente de origem
    const customerFrom = this.customerService.getCustomerById(customerIdFrom);
    if (!customerFrom) {
      throw new Error('Cliente de origem não encontrado!');
    }

    // obter o cliente de destino
    const customerTo = this.customerService.getCustomerById(customerIdTo);
    if (!customerTo) {
      throw new Error('Cliente de destino não encontrado!');
    }

    // obter as contas de origem
    const fromAccount = customerFrom
      .getAccounts()
      .find((acc) => acc.getId() === fromAccountId);
    if (!fromAccount) {
      throw new Error('Conta de origem não encontrada!');
    }

    // obter as contas de destino
    const toAccount = customerTo
      .getAccounts()
      .find((acc) => acc.getId() === toAccountId);
    if (!toAccount) {
      throw new Error('Conta de destino não encontrada!');
    }

    // verificar o saldo e realizar a transferência
    if (fromAccount.getBalance() >= amount) {
      const newFromBalance = fromAccount.getBalance() - amount;
      // console.log(`Novo saldo: ${newFromBalance}`);
      const newToBalance = toAccount.getBalance() + amount;
      fromAccount.setBalance(newFromBalance);
      // console.log(`Novo saldo conta origem: ${fromAccount.getBalance()}`);
      toAccount.setBalance(newToBalance);
      // console.log(`Novo saldo conta destino: ${toAccount.getBalance()}`);
    } else {
      throw new Error('Saldo insuficiente para transferência!');
    }

    return { fromAccount, toAccount };
  }
}
