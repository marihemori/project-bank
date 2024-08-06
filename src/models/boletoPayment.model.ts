import { Payment } from './payment.model';

export class BoletoPayment extends Payment {
  public boletoNumber: string;

  constructor(amount: number, date: Date, boletoNumber: string) {
    super(amount, date);
    this.boletoNumber = boletoNumber;
  }
}
