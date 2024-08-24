import { Entity } from 'typeorm';
import { AccountType } from '../../enums/accountType.enum';
import { AccountEntity } from './account.entity';
import { ClientEntity } from '../client.entity';

@Entity('checkingAccount')
export class CheckingAccountEntity extends AccountEntity {
  public overdraft: number = 100.0; // cheque especial
  public balance: number = 0;

  constructor(balance: number, overdraft: number, client: ClientEntity) {
    super(balance, AccountType.CORRENTE, client);
    this.overdraft = overdraft;
    this.balance = this.balance + this.overdraft;
  }

  // Depositar
  deposit(value: number): void {
    this.balance += value;
  }

  // Sacar
  withdraw(value: number): void {
    if (this.balance >= value) {
      this.balance -= value;
    } else {
      throw new Error('Saldo insuficiente para saque!');
    }
  }

  // Transferir
  transfer(destination: AccountEntity, value: number): void {
    if (this.balance >= value) {
      this.balance -= value;
      destination.deposit(value);
    } else {
      throw new Error('Saldo insuficiente para transferência');
    }
  }
}
