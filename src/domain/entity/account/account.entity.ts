import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountType } from '../../enums/accountType.enum';
import { ClientEntity } from '../client.entity';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  public balance: number = 0;

  @Column()
  public accountType: AccountType;

  @Column()
  public overdraft: number = 100.0; // cheque especial

  @Column({ type: 'numeric' })
  public interestRate: number; // taxa de juros

  @ManyToOne(() => ClientEntity, (client) => client.accounts, { eager: true })
  @JoinColumn({ name: 'client_id' })
  public client: ClientEntity;

  constructor(balance: number, accountType: AccountType, client: ClientEntity) {
    this.id = uuidv4();
    this.balance = balance;
    this.accountType = accountType;
    this.client = client;
  }

  deposit(value: number): void {
    this.balance += value;
  }

  withdraw(value: number): void {
    if (this.balance >= value) {
      this.balance -= value;
    } else {
      throw new Error('Saldo insuficiente para saque!');
    }
  }

  transfer(destination: AccountEntity, value: number): void {
    if (this.balance >= value) {
      this.balance -= value;
      destination.deposit(value);
    } else {
      throw new Error('Saldo insuficiente para transferência');
    }
  }

  getBalance(): number {
    return this.balance;
  }
}
