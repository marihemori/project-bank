import { v4 as uuidv4 } from 'uuid';

export abstract class Payment {
  public id = uuidv4();
  public amount: number;
  public date: Date;
  public accountId: string;

  constructor(amount: number, date: Date, accountId: string) {
    this.amount = amount;
    this.date = date;
    this.accountId = accountId;
  }

  abstract processPayment(customerId: string, accountId: string): any;
}
