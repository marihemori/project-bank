import { Account } from './account.model';
import { AccountType } from '../enums/accountType.enum';

// Conta corrente
export class CheckingAccount extends Account {
  constructor(balance: number, overdraft: number) {
    super(balance, overdraft, AccountType.CORRENTE);
  }

  // depositar
  public deposit(amount: number): void {
    this.setBalance(this.getBalance() + amount);
  }

  // sacar
  public withdraw(value: number): void {
    if (this.getBalance() + this.overdraft >= value) {
      this.setBalance(this.getBalance() - value);
    } else {
      throw new Error('Saldo insuficiente para saque!');
    }
  }

  // transferir
  transfer(destination: Account, value: number) {
    if (this.getBalance() + this.overdraft >= value) {
      this.setBalance(this.getBalance() - value);
      destination.deposit(value);
    } else {
      throw new Error('Saldo insuficiente para transferência');
    }
  }

  // atualizar saldo
  updateBalance(amount: number): void {
    this.balance += amount;
    if (this.balance < -this.overdraft) {
      throw new Error('Saldo insuficiente');
    }
  }
}
