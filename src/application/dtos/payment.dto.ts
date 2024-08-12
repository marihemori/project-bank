import { Payment } from '../../domain/entity/payment.model';

export class PaymentDto {
  id: string;
  amount: number;
  date: Date;

  constructor(payment: Payment) {
    this.id = payment.id;
    this.amount = payment.amount;
    this.date = payment.date;
  }
}
