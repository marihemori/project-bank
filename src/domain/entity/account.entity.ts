import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AccountType } from '../enums/accountType.enum';

@Entity('account')
export abstract class Account {
  @PrimaryGeneratedColumn('uuid')
  protected id: string; // id da conta

  @Column({ type: 'numeric' })
  protected balance: number; // saldo

  @Column({ type: 'numeric' })
  protected overdraft: number; // cheque especial

  @Column({ type: 'enum', enum: AccountType, default: AccountType.POUPANCA })
  protected accountType: AccountType; // tipo de conta

  constructor(balance: number, overdraft: number, accountType: AccountType) {
    this.id = uuidv4();
    this.balance = balance;
    this.overdraft = overdraft;
    this.accountType = accountType;
  }
}
