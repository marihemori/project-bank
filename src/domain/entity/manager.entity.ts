import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity('managers')
export class ManagerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  fullname: string;

  @OneToMany(() => ClientEntity, (client) => client.manager)
  clients: ClientEntity[];

  constructor(fullname: string, clients: []) {
    this.id = uuidv4();
    this.fullname = fullname;
    this.clients = clients;
  }
}
