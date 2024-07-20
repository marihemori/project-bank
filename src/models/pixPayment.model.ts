import { Account } from './account.model';
import { Payment } from './payment.model';

export class PixPayment extends Payment {
  public pixKey: string;

  constructor(amount: number, date: Date, pixKey: string, account: Account) {
    super(amount, date, account);
    this.pixKey = pixKey;
  }

  processPayment(): void {
    this.account.processPayment(this.amount);
    console.log(
      `O pagamento via PIX para a chave ${this.pixKey} no valor de ${this.amount} está sendo processado!`,
    );
  }
}
