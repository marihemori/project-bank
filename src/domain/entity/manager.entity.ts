import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity('manager')
export class ManagerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  fullname: string;

  @OneToMany(() => CustomerEntity, (customer) => customer.manager)
  customers: CustomerEntity[];

  constructor(fullname: string, customers: []) {
    this.id = uuidv4();
    this.fullname = fullname;
    this.customers = customers;
  }
}
