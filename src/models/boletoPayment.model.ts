import { CustomerService } from 'src/services/customer.service';
import { Payment } from './payment.model';
import { AccountService } from 'src/services/account.service';

export class BoletoPayment extends Payment {
  public boletoNumber: string;
  private accountService: AccountService;
  private customerService: CustomerService;

  constructor(
    amount: number,
    date: Date,
    boletoNumber: string,
    accountId: string,
    accountService: AccountService,
  ) {
    super(amount, date, accountId);
    this.boletoNumber = boletoNumber;
    this.accountService = accountService;
  }

  processPayment(customerId: string, accountId: string): any {
    const customer = this.customerService.getCustomerById(customerId);
    if (!customer) {
      throw new Error('Cliente não encontrado!');
    }
    console.log('Cliente encontrado:', customer);

    const account = customer
      .getAccounts()
      .find((acc) => acc.getId() === accountId);
    if (!account) {
      throw new Error('Conta não encontrada!');
    }
    console.log('Conta encontrada:', account.getId());

    if (account.getBalance() < this.amount) {
      throw new Error('Saldo insuficiente!');
    }

    account.processPayment(this.amount); // processa o pagamento
    console.log(
      `O pagamento do boleto ${this.boletoNumber} no valor de ${this.amount} está sendo processado!`,
    );
  }
}
