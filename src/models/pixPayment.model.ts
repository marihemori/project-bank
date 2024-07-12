import { Account } from './account.model';
import { Payment } from './payment.model';

export class PixPayment extends Payment {
  public pixKey: string;

  constructor(amount: number, date: Date, pixKey: string, account: Account) {
    super(amount, date, account);
    this.pixKey = pixKey;
  }

  processPayment(): void {
    if (this.account.hasSufficientFunds(this.amount)) {
      this.account.deductAmount(this.amount);
      console.log(`O pagamento de ${this.amount} está sendo processado!`);
    } else {
      throw new Error('Dinheiro insuficiente!');
    }
  }
}
