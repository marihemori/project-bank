import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Manager } from '../models/manager.model';

@Entity('account')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  protected id: string; // id da conta

  @Column({ type: 'text' })
  protected fullName: string; // nome completo

  @Column({ type: 'text' })
  protected address: string; // endereço

  @Column({ type: 'text' })
  protected phone: string; // telefone

  @Column({ type: 'int' })
  protected income: number; // renda

  @Column({ type: 'text', nullable: true })
  protected manager?: Manager; // gerente

  constructor(
    fullName: string,
    address: string,
    phone: string,
    income: number,
    manager?: Manager,
  ) {
    this.id = uuidv4();
    this.fullName = fullName;
    this.address = address;
    this.phone = phone;
    this.income = income;
    this.manager = manager;
  }
}
