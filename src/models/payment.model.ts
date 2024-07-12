import { v4 as uuidv4 } from 'uuid';
import { Account } from './account.model';

export abstract class Payment {
  public id = uuidv4();
  public amount: number;
  public date: Date;
  public account: Account;

  constructor(amount: number, date: Date, account: Account) {
    this.id = uuidv4();
    this.amount = amount;
    this.date = date;
    this.account = account;
  }

  abstract processPayment(): void;
}
