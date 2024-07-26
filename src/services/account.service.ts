import { Injectable } from '@nestjs/common';
import { Account } from '../models/account.model';
import { ClientService } from './client.service';

@Injectable()
export class AccountService {
  private accounts: Account[] = [];

  constructor(private readonly clientService: ClientService) {}

  // Adicionar conta
  public addAccount(account: Account): void {
    this.accounts.push(account);
  }

  public findAccount(accountId: string): Account {
    for (const client of this.clientService.getAllClients()) {
      const account = client
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      if (account) {
        return account;
      }
    }
    throw new Error('Conta não encontrada!');
  }

  // verificar saldo
  public verifyBalance(accountId: string): number {
    const account = this.findAccount(accountId);
    console.log(`Saldo da conta ${accountId}: ${account.getBalance()}`);
    return account.getBalance();
  }

  // depositar
  public deposit(accountId: string, amount: number): void {
    const account = this.findAccount(accountId);
    console.log(`Depositando ${amount} na conta ${accountId}`);
    account.deposit(amount);
    console.log(`Novo saldo: ${account.getBalance()}`);
    console.log('oi?');
  }

  // sacar
  public withdraw(accountId: string, amount: number): void {
    console.log(`Tentando sacar ${amount} da conta ${accountId}`);
    const account = this.findAccount(accountId);
    const newBalance = account.getBalance() - amount;
    if (newBalance < 0) {
      throw new Error('Saldo insuficiente para saque!');
    } else {
      account.setBalance(newBalance);
    }
  }

  // transferir
  public transfer(
    fromAccount: Account,
    toAccount: Account,
    value: number,
  ): void {
    if (fromAccount.getBalance() >= value) {
      const newFromBalance = fromAccount.getBalance() - value;
      const newToBalance = toAccount.getBalance() + value;
      fromAccount.setBalance(newFromBalance);
      toAccount.setBalance(newToBalance);
    } else {
      throw new Error('Saldo insuficiente para transferência!');
    }
  }
}
