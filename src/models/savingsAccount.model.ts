import { Account } from './account.model';

// Conta poupança
export class SavingsAccount extends Account {
  private interestRate: number; // taxa de juros

  constructor(balance: number, interestRate: number) {
    super(balance, 0, 'Savings');
    this.interestRate = interestRate;
  }

  // calcular taxa
  calculateInterest(): number {
    return this.balance * this.interestRate;
  }

  // transferir
  transfer(destiny: Account, value: number): void {
    const interest = this.calculateInterest();
    const totalValue = value + interest;

    this.balance -= totalValue;
    destiny.balance += value;

    if (totalValue > this.balance) {
      throw new Error('Saldo insuficiente para fazer a transferência!');
    }
  }
}
