import { Injectable } from '@nestjs/common';
import { Account } from '../models/account.model';
import { CheckingAccount } from '../models/checkingAccount.model';

@Injectable()
export class AccountService {
  private accounts: Account[] = [];

  // depositar
  deposit(account: Account, value: number): void {
    account.balance += value;
  }

  // sacar
  withdraw(account: Account, value: number): void {
    if (account instanceof CheckingAccount) {
      account.withdraw(value);
    } else if (account.balance >= value) {
      account.balance -= value;
    } else {
      throw new Error('Saldo insuficiente');
    }
  }

  // verificar saldo
  verifyBalance(account: Account): number {
    return account.balance;
  }

  // transferir
  transfer(fromAccount: Account, toAccount: Account, value: number): void {
    if (fromAccount.balance >= value) {
      fromAccount.balance -= value;
      toAccount.balance += value;
    } else {
      throw new Error('Saldo insuficiente para transferência');
    }
  }
}
