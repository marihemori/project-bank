import { Payment } from './payment.model';

export class PixPayment extends Payment {
  public pixKey: string;

  constructor(amount: number, date: Date, pixKey: string) {
    super(amount, date);
    this.pixKey = pixKey;
  }
}
