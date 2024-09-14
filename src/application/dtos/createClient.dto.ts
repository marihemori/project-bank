import { AccountEntity } from 'src/domain/entity/account/account.entity';

export class CreateClientDto {
  fullname: string;
  address: string;
  phone: string;
  income: number;
  accounts: AccountEntity[];
  managerId?: string;

  constructor(client) {
    this.fullname = client.fullname;
    this.address = client.address;
    this.phone = client.phone;
    this.income = client.income;
    this.accounts = client.accounts;
    this.managerId = client.managerId;
  }
}
