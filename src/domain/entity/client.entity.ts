import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ManagerEntity } from './manager.entity';
import { AccountEntity } from './account/account.entity';

@Entity('clients')
export class ClientEntity {
  // Id da conta
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Nome completo
  @Column({ type: 'text' })
  fullname: string;

  // Endereço
  @Column({ type: 'text' })
  address: string;

  // Telefone
  @Column({ type: 'text' })
  phone: string;

  // Renda salarial
  @Column('decimal', { precision: 10, scale: 2 })
  income: number;

  // Contas do cliente
  @OneToMany(() => AccountEntity, (account) => account.client, {
    cascade: true,
  })
  @JoinColumn()
  accounts: AccountEntity[];

  // Gerente do cliente
  @ManyToOne(() => ManagerEntity, { nullable: true })
  @JoinColumn({ name: 'manager_id' })
  manager?: ManagerEntity;

  constructor(
    fullname: string,
    address: string,
    phone: string,
    income: number,
    accounts: AccountEntity[],
    manager?: ManagerEntity,
  ) {
    this.id = uuidv4();
    this.fullname = fullname;
    this.address = address;
    this.phone = phone;
    this.income = income;
    this.accounts = accounts;
    this.manager = manager;
  }
}
