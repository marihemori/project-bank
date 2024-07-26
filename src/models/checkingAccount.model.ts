import { Account } from './account.model';

// Conta corrente
export class CheckingAccount extends Account {
  constructor(balance: number, overdraft: number) {
    super(balance, overdraft, 'Corrente');
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
}
