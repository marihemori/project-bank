import { Injectable } from '@nestjs/common';
import { PixPayment } from '../models/pixPayment.model';
import { BoletoPayment } from '../models/boletoPayment.model';
import { Payment } from '../models/payment.model';
import { AccountService } from './account.service';

@Injectable()
export class PaymentService {
  private payments: Payment[] = [];

  getAllPayments(): Payment[] {
    return this.payments;
  }

  processPixPayment(
    amount: number,
    pixKey: string,
    accountId: string,
    accountService: AccountService,
  ): PixPayment {
    const payment = new PixPayment(amount, new Date(), pixKey);
    try {
      // payment.processPayment();
      this.payments.push(payment);
      return payment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  processBoletoPayment(
    amount: number,
    boletoNumber: string,
    accountId: string,
    accountService: AccountService,
  ): BoletoPayment {
    const payment = new BoletoPayment(
      amount,
      new Date(),
      boletoNumber,
      accountId,
      accountService,
    );
    try {
      // payment.processPayment();
      this.payments.push(payment);
      return payment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
