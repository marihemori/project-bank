import { Entity, Column } from 'typeorm';
import { AccountType } from '../../enums/accountType.enum';
import { AccountEntity } from './account.entity';
import { ClientEntity } from '../client.entity';

@Entity('savingsAccount')
export class SavingsAccountEntity extends AccountEntity {
  @Column({ type: 'numeric' })
  public interestRate: number; // taxa de juros

  constructor(balance: number, interestRate: number, client: ClientEntity) {
    super(balance, AccountType.SAVINGS, client);
    this.interestRate = interestRate;
  }

  calculateInterest(value: number): number {
    return value * this.interestRate;
  }

  transfer(destination: AccountEntity, value: number): void {
    if (value > this.balance) {
      throw new Error('Saldo insuficiente para transferência');
    }
    this.withdraw(value);
    destination.deposit(value);
  }
}
