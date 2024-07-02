import { Account } from './account.entity';

// Conta poupança
export class SavingsAccount extends Account {
  private interestRate: number; // taxa de juros

  constructor(balance: number, interestRate: number) {
    super(balance, 'Savings');
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
    if (totalValue > this.balance) {
      throw new Error('Saldo insuficiente para fazer a transferência!');
    }
    this.balance -= totalValue;
    destiny.balance += value;
  }
}
