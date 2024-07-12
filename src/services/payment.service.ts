import { Injectable } from '@nestjs/common';
import { PixPayment } from '../models/pixPayment.model';
import { BoletoPayment } from '../models/boletoPayment.model';
import { Payment } from '../models/payment.model';
import { Account } from 'src/models/account.model';

@Injectable()
export class PaymentService {
  private payments: Payment[] = [];

  getAllPayments(): Payment[] {
    return this.payments;
  }

  processPixPayment(
    amount: number,
    pixKey: string,
    account: Account,
  ): PixPayment {
    const payment = new PixPayment(amount, new Date(), pixKey, account);
    try {
      payment.processPayment();
      this.payments.push(payment);
      return payment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  processBoletoPayment(
    amount: number,
    boletoNumber: string,
    account: Account,
  ): BoletoPayment {
    const payment = new BoletoPayment(
      amount,
      new Date(),
      boletoNumber,
      account,
    );
    try {
      payment.processPayment();
      this.payments.push(payment);
      return payment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
