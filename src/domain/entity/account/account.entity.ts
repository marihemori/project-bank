import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AccountType } from '../../enums/accountType.enum';
import { TransactionEntity } from '../transaction.entity';

@Entity('account')
export abstract class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // id da conta

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number; // saldo

  @Column({ type: 'numeric' })
  overdraft: number; // cheque especial

  @Column({ type: 'enum', enum: AccountType, default: AccountType.POUPANCA })
  accountType: AccountType; // tipo de conta

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions: TransactionEntity[];

  constructor(balance: number, overdraft: number, accountType: AccountType) {
    this.id = uuidv4();
    this.balance = balance;
    this.overdraft = overdraft;
    this.accountType = accountType;
  }
}
