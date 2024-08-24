import { CheckingAccount } from 'src/domain/models/checkingAccount.model';
import { SavingsAccount } from 'src/domain/models/savingsAccount.model';

export class ClientDto {
  id: string;
  fullname: string;
  address: string;
  phone: string;
  income: number;
  managerId?: string;
  accountType: (CheckingAccount | SavingsAccount)[] = [];

  constructor(client) {
    this.id = client.id;
    this.fullname = client.fullname;
    this.address = client.address;
    this.phone = client.phone;
    this.income = client.income;
    this.managerId = client.manager?.id;
    this.accountType = client.accountType;
  }
}
