import { Account } from './account.entity';

// Conta corrente
export class CheckingAccount extends Account {
  private overdraft: number; // cheque especial

  constructor(balance: number, overdraft: number) {
    super(balance, 'Checking');
    this.overdraft = overdraft;
  }

  // sacar
  withdraw(value: number): void {
    if (this.balance + this.overdraft >= value) {
      this.balance -= value;
    } else {
      throw new Error('Saldo insuficiente');
    }
  }
}
