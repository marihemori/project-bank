import { Injectable } from '@nestjs/common';
import { Account } from '../models/account.model';
import { CheckingAccount } from '../models/checkingAccount.model';

@Injectable()
export class AccountService {
  private accounts: Account[] = [];

  // depositar
  deposit(account: Account, value: number): void {
    const newBalance = account.getBalance() + value;
    account.setBalance(newBalance);
  }

  // sacar
  withdraw(account: Account, value: number): void {
    if (account instanceof CheckingAccount) {
      account.withdraw(value);
    } else if (account.getBalance() >= value) {
      const newBalance = account.getBalance() - value;
      account.setBalance(newBalance);
    } else {
      throw new Error('Saldo insuficiente para saque!');
    }
  }

  // verificar saldo
  verifyBalance(account: Account): number {
    return account.getBalance();
  }

  // transferir
  transfer(fromAccount: Account, toAccount: Account, value: number): void {
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
