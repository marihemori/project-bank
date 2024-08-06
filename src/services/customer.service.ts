import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { BoletoPayment } from 'src/models/boletoPayment.model';
import { CheckingAccount } from 'src/models/checkingAccount.model';
import { SavingsAccount } from 'src/models/savingsAccount.model';
import { Manager } from 'src/models/manager.model';
import { AccountService } from './account.service';
import { CustomerDto } from 'src/dtos/customer.dto';
import { PaymentDto } from 'src/dtos/payment.dto';
import { PixPayment } from 'src/models/pixPayment.model';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];

  constructor(
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
  ) {}

  // Lista todos os clientes
  public getAllCustomers(): Customer[] {
    return this.customers;
  }

  // Lista um único cliente
  public getCustomerById(id: string): Customer {
    const customer = this.customers.find((customer) => customer.getId() === id);
    if (!customer) {
      throw new Error('Cliente não encontrado!');
    }
    // console.log(customer, 'cliente que vai pagar o boleto(customer service)');
    return customer;
  }

  // Cria um novo cliente
  public openAccount(
    fullName: string,
    address: string,
    phone: string,
    income: number,
    accountType: typeof CheckingAccount | typeof SavingsAccount,
    manager: Manager,
  ): Customer {
    const customer = new Customer(fullName, address, phone, income, manager);
    customer.openAccount(accountType);
    this.customers.push(customer);
    return customer;
  }

  // Mudar tipo de conta
  public changeAccountType(
    customerId: string,
    accountId: string,
    newType: typeof CheckingAccount | typeof SavingsAccount,
  ): Customer {
    try {
      const customer = this.getCustomerById(customerId);
      if (!customer) {
        throw new Error('Cliente não encontrado!');
      }

      const account = customer
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      if (!account) {
        throw new Error('Conta não encontrada!');
      }

      customer.changeAccountType(account, newType);
      return customer;
    } catch (error) {
      console.log('Houve um erro ao mudar o tipo da conta:', error);
      throw new Error('Houve um erro ao mudar o tipo da conta');
    }
  }

  // Pagar boleto
  public payBoleto(
    customerId: string,
    accountId: string,
    amount: number,
    boletoNumber: string,
  ): { customer: CustomerDto; payment: PaymentDto } {
    const customer = this.customers.find(
      (customer) => customer.getId() === customerId,
    );
    if (!customer) {
      throw new Error('Cliente não encontrado!');
    }
    console.log('cliente que vai pagar o boleto:', customer.getId());

    const account = customer
      .getAccounts()
      .find((acc) => acc.getId() === accountId);
    if (!account) {
      throw new Error('Conta não encontrada!');
    }
    console.log('Conta encontrada:', account.getId());

    if (account.getBalance() < amount) {
      throw new Error('Saldo insuficiente!');
    }

    // Processa o pagamento
    const payment = new BoletoPayment(amount, new Date(), boletoNumber);
    console.log(payment.amount, 'valor do boleto');

    account.updateBalance(-amount);
    console.log(customer.getId(), 'atualiza o saldo do cliente');

    const customerDto = new CustomerDto(customer);
    const paymentDto = new PaymentDto(payment);
    console.log('customerDto:', customerDto);
    return { customer: customerDto, payment: paymentDto };
  }

  // Pagar pix
  public payPix(
    customerId: string,
    accountId: string,
    amount: number,
    pixKey: string,
  ): { customer: CustomerDto; payment: PaymentDto } {
    const customer = this.customers.find(
      (customer) => customer.getId() === customerId,
    );
    if (!customer) {
      throw new Error('Cliente não encontrado!');
    }
    console.log('cliente que vai pagar o pix:', customer.getId());

    const account = customer
      .getAccounts()
      .find((acc) => acc.getId() === accountId);
    if (!account) {
      throw new Error('Conta não encontrada!');
    }
    console.log('Conta encontrada:', account.getId());

    if (account.getBalance() < amount) {
      throw new Error('Saldo insuficiente!');
    }

    // Processa o pagamento
    const payment = new PixPayment(amount, new Date(), pixKey);
    console.log(payment.amount, 'valor do pix');

    account.updateBalance(-amount);
    console.log(customer.getId(), 'atualiza o saldo do cliente');

    const customerDto = new CustomerDto(customer);
    const paymentDto = new PaymentDto(payment);
    console.log('customerDto:', customerDto);
    return { customer: customerDto, payment: paymentDto };
  }

  // Fechar uma conta
  public closeAccount(customerId: string, accountId: string): Customer {
    try {
      const customer = this.getCustomerById(customerId);
      if (!customer) {
        throw new Error('Cliente não encontrado!');
      }
      const account = customer
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      if (!account) {
        throw new Error('Conta não encontrada!');
      }
      customer.closeAccount(account);
      return customer;
    } catch (error) {
      console.log('Houve um erro ao fechar a conta:', error);
    }
  }

  //Deletar cliente
  public deleteClient(customerId: string): void {
    this.customers = this.customers.filter(
      (customer) => customer.getId() !== customerId,
    );
  }
}
