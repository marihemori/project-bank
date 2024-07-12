import { Account } from './account.model';
import { Payment } from './payment.model';

export class BoletoPayment extends Payment {
  public boletoNumber: string;

  constructor(
    amount: number,
    date: Date,
    boletoNumber: string,
    account: Account,
  ) {
    super(amount, date, account);
    this.boletoNumber = boletoNumber;
  }

  processPayment(): void {
    if (this.account.hasSufficientFunds(this.amount)) {
      this.account.deductAmount(this.amount);
      console.log(
        `O pagamento do boleto ${this.boletoNumber} no valor de ${this.amount} está sendo processado!`,
      );
    } else {
      throw new Error('Dinheiro insuficiente!');
    }
  }
}
