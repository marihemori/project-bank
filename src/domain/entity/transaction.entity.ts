// import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  Entity,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { AccountEntity } from './account/account.entity';

export enum TransactionType {
  DEPOSIT = 'deposit', // depositar
  WITHDRAW = 'withdraw', // sacar
  TRANSFER = 'transfer', // transferir
}

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // @ManyToOne(() => AccountEntity, (account) => account.transactions)
  // account: AccountEntity;

  // constructor(type: TransactionType, amount: number, account: AccountEntity) {
  //   this.id = uuidv4();
  //   this.type = type;
  //   this.amount = amount;
  //   this.account = account;
  // }
}
