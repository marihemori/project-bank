import { Column, Entity } from 'typeorm';
import { AccountType } from '../../enums/accountType.enum';
import { AccountEntity } from './account.entity';
import { ClientEntity } from '../client.entity';

@Entity('currentAccount')
export class CurrentAccountEntity extends AccountEntity {
  @Column('decimal', { precision: 10, scale: 2 })
  public overdraft: number = 100.0; // cheque especial

  @Column('decimal', { precision: 10, scale: 2 })
  public balanceTotal: number = 0;

  constructor(balance: number, overdraft: number, client: ClientEntity) {
    super(balance, AccountType.CURRENT, client);
    this.overdraft = overdraft;
    this.balanceTotal = this.balance + this.overdraft;
  }

  // Depositar
  deposit(value: number): void {
    this.balance += value;
    this.balanceTotal = this.balance + this.overdraft;
  }

  // Sacar
  withdraw(value: number): void {
    if (value > this.balance) {
      throw new Error('Saldo insuficiente para saque!');
    }

    this.balance -= value;
    this.balanceTotal = this.balance + this.overdraft;
  }

  // Transferir
  transfer(destination: AccountEntity, value: number): void {
    if (value > this.balanceTotal) {
      throw new Error('Saldo insuficiente para transferência');
    }
    this.withdraw(value);
    destination.deposit(value);
  }
}
