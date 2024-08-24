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
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number = 0;

  @Column()
  accountType: AccountType;

  @ManyToOne(() => ClientEntity, (client) => client.accounts, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  constructor(balance: number, accountType: AccountType, client: ClientEntity) {
    this.id = uuidv4();
    this.balance = balance;
    this.accountType = accountType;
    this.client = client;
  }
}
