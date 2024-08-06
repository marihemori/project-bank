import { Account } from './account.model';
import { AccountType } from '../enums/accountType.enum';

// Conta poupança
export class SavingsAccount extends Account {
  private interestRate: number; // taxa de juros

  constructor(balance: number, overdraft: number, interestRate: number) {
    super(balance, overdraft, AccountType.POUPANCA);
    this.interestRate = interestRate;
  }

  // calcular taxa de transferência
  public calculateInterest(): number {
    return this.getBalance() * this.interestRate;
  }

  // depositar
  public deposit(amount: number): void {
    this.setBalance(this.getBalance() + amount);
  }

  // sacar
  public withdraw(amount: number): void {
    if (this.getBalance() >= amount) {
      this.setBalance(this.getBalance() - amount);
    } else {
      throw new Error('Saldo insuficente!');
    }
  }

  // transferir
  transfer(destination: Account, value: number): void {
    const interest = this.calculateInterest(); // taxa de transferência
    const totalValue = value + interest; // valor total taxa + valor
    if (totalValue <= this.getBalance()) {
      this.setBalance(this.getBalance() - totalValue);
      destination.deposit(value);
    } else {
      throw new Error('Saldo insuficiente para transferência!');
    }
  }

  // atualizar saldo
  updateBalance(amount: number): void {
    this.balance += amount;
  }
}
