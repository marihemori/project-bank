import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { v4 as uuidv4 } from 'uuid';
import { ClientModule } from '../client/client.module';

@Module({
  controllers: [ManagerController],
  providers: [ClientModule],
})
export class ManagerModule {
  id: string;
  fullName: string;
  clients: ClientModule[];

  constructor(fullName: string) {
    this.id = uuidv4();
    this.fullName = fullName;
    this.clients = [];
  }
}
