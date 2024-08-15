import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ManagerEntity } from './manager.entity';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // id da conta

  @Column({ type: 'text' })
  fullname: string; // nome completo

  @Column({ type: 'text' })
  address: string; // endereço

  @Column({ type: 'text' })
  phone: string; // telefone

  @Column('decimal', { precision: 10, scale: 2 })
  income: number; // renda

  @ManyToOne(() => ManagerEntity, (manager) => manager.customers, {
    nullable: true,
  })
  manager?: ManagerEntity;

  constructor(
    fullname: string,
    address: string,
    phone: string,
    income: number,
    manager?: ManagerEntity,
  ) {
    this.id = uuidv4();
    this.fullname = fullname;
    this.address = address;
    this.phone = phone;
    this.income = income;
    this.manager = manager;
  }
}
