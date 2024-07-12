import { v4 as uuidv4 } from 'uuid';

export class Account {
  public id: string;
  public balance: number;
  public overdraftLimit: number;
  public accountType: 'Checking' | 'Savings';

  constructor(
    balance: number,
    overdraftLimit: number,
    accountType: 'Checking' | 'Savings',
  ) {
    this.id = uuidv4();
    this.balance = balance;
    this.overdraftLimit = overdraftLimit;
    this.accountType = accountType;
  }

  hasSufficientFunds(amount: number): boolean {
    return this.balance + this.overdraftLimit >= amount;
  }

  deductAmount(amount: number): void {
    this.balance -= amount;
  }

  // depositar
  deposit(value: number): void {
    this.balance += value;
  }

  // sacar
  withdraw(value: number): void {
    if (this.balance >= value) {
      this.balance -= value;
    } else {
      throw new Error('Saldo insuficiente!');
    }
  }

  // transferir
  transfer(desinty: Account, value: number): void {
    if (this.balance >= value) {
      this.balance -= value;
    } else {
      throw new Error('Saldo insuficiente para transferência!');
    }
  }
}
