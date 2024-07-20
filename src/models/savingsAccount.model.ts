import { Account } from './account.model';

// Conta poupança
export class SavingsAccount extends Account {
  private interestRate: number; // taxa de juros

  constructor(balance: number, overdraft: number, interestRate: number) {
    super(balance, overdraft, 'Poupança');
    this.interestRate = interestRate;
  }

  // calcular taxa de transferência
  public calculateInterest(): number {
    return this.getBalance() * this.interestRate;
  }

  // depositar
  public deposit(value: number): void {
    this.setBalance(this.getBalance() + value);
  }

  // sacar
  public withdraw(value: number): void {
    if (this.getBalance() >= value) {
      this.setBalance(this.getBalance() - value);
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
}
