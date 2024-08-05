import { AccountService } from 'src/services/account.service';
import { Payment } from './payment.model';

export class PixPayment extends Payment {
  public pixKey: string;
  private accountService: AccountService;

  constructor(
    amount: number,
    date: Date,
    pixKey: string,
    accountId: string,
    accountService: AccountService,
  ) {
    super(amount, date, accountId);
    this.pixKey = pixKey;
    this.accountService = accountService;
  }

  processPayment(): void {
    const account = this.accountService.getAccountById(this.accountId);

    if (!account) {
      throw new Error('Conta não encontrada!');
    }

    if (account.getBalance() < this.amount) {
      throw new Error('Saldo insuficiente!');
    }

    account.processPayment(this.amount); // processa o pagamento

    console.log(
      `O pagamento via PIX para a chave ${this.pixKey} no valor de ${this.amount} está sendo processado!`,
    );
  }
}
