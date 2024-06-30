import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { v4 as uuidv4 } from 'uuid';
import { ManagerModule } from 'src/manager/manager.module';

@Module({
  controllers: [ClientController],
  providers: [ManagerModule],
})
export class ClientModule {
  id: string;
  fullName: string;
  address: string;
  phone: string;
  bankAccounts: ContaBancaria[];
  bankManager: ManagerModule;

  constructor(fullName: string, address: string, phone: string) {
    this.id = uuidv4();
    this.fullName = fullName;
    this.address = address;
    this.phone = phone;
    this.bankAccounts = [];
  }
}
