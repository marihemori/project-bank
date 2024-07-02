import { v4 as uuidv4 } from 'uuid';
import { Account } from 'src/accounts/account.entity';
import { Manager } from 'src/managers/manager.entity';

export class Client {
  public id: string;
  public fullName: string;
  public address: string;
  public phone: string;
  public accountType: 'Checking' | 'Savings';
  public accounts: Account[];
  public manager: Manager;

  constructor(
    fullName: string,
    address: string,
    phone: string,
    accountType: 'Checking' | 'Savings',
    manager: Manager,
  ) {
    this.id = uuidv4();
    this.fullName = fullName;
    this.address = address;
    this.phone = phone;
    this.accountType = accountType;
    this.accounts = [];
    this.manager = manager;
  }
}
