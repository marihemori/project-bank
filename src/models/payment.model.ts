import { v4 as uuidv4 } from 'uuid';

export abstract class Payment {
  public id = uuidv4();
  public amount: number;
  public date: Date;

  constructor(amount: number, date: Date) {
    this.amount = amount;
    this.date = date;
  }
}
