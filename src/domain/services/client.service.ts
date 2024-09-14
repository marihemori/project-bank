import {
  // forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientEntity } from '../entity/client.entity';
import { BoletoPayment } from '../models/boletoPayment.model';
import { CheckingAccount } from '../models/checkingAccount.model';
import { SavingsAccount } from '../models/savingsAccount.model';
import { Manager } from '../models/manager.model';
import { ClientDto } from 'src/application/dtos/client.dto';
import { PaymentDto } from 'src/application/dtos/payment.dto';
import { PixPayment } from '../models/pixPayment.model';
import { AccountService } from './account.service';
import { ClientRepository } from 'src/infrastructure/repositories/client.repository';
import { CreateClientDto } from 'src/application/dtos/createClient.dto';
import { ManagerEntity } from '../entity/manager.entity';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { ClientDto } from 'src/application/dtos/client.dto';
import { AccountFactory } from '../factories/account.factory';

@Injectable()
export class ClientService {
  private clients: ClientEntity[] = [];
  managerRepository: any;

  constructor(
    @Inject(forwardRef(() => AccountService), IClientRepository)
    private readonly accountService: AccountService,
    private readonly customerRepository: IClientRepository,
  ) {}

  constructor(
    @Inject(ClientRepository)
    private readonly clientRepository: ClientRepository,
    private readonly accountRepository: AccountRepository,
    private readonly accountFactory: AccountFactory,
  ) {}

  constructor(private readonly customerRepository: CustomerRepository) {}

  // Adiciona um novo cliente à lista de clientes atraves do gerente
  public async addClient(client: Client): Promise<void> {
    this.clients.push(client);
  }

  // Lista todos os clientes
  public async getAllClients(): Promise<ClientEntity[]> {
    return await this.clientRepository.getAllClients();
  }

  // Lista um único cliente
  public async getClientById(id: string): Promise<ClientEntity> {
    const client = await this.clientRepository.getClientById(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado!');
    }
    return client;
  }

  // Cria um novo cliente
  public openAccount(
    fullname: string,
    address: string,
    phone: string,
    income: number,
    accountType: typeof CheckingAccount | typeof SavingsAccount,
    manager: Manager,
  ): Customer {
    const customer = new Customer(fullname, address, phone, income, manager);
    customer.openAccount(accountType);
    this.customers.push(customer);
    return customer;
  }

  // Criar novo cliente
  async createClient(client: CreateClientDto): Promise<ClientEntity> {
    let manager: ManagerEntity | undefined;
    if (client.managerId) {
      manager = await this.managerRepository.findOne(client.managerId);
      if (!manager) {
        throw new NotFoundException('Gerente não encontrado!');
      }
    }

    console.log('client', client);

    const createClient = new ClientEntity(
      client.fullname,
      client.address,
      client.phone,
      client.income,
      [],
      manager,
    );

    const accounts = client.accounts.map((accountDto) => {
      return this.accountFactory.createAccount(
        accountDto.accountType,
        accountDto.balance,
        accountDto.overdraft,
        createClient,
        accountDto.interestRate,
      );
    });

    console.log('accounts', accounts);

    console.log('createClient', createClient);
    this.clients.push(createClient);
    return await this.clientRepository.createClient(createClient);
  }

  // Mudar tipo de conta
  public changeAccountType(
    clientId: string,
    accountId: string,
    newType: typeof CheckingAccount | typeof SavingsAccount,
  ): Client {
    try {
      const client = this.getClientById(clientId);
      if (!client) {
        throw new Error('Cliente não encontrado!');
      }

      const account = client
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      if (!account) {
        throw new Error('Conta não encontrada!');
      }

      client.changeAccountType(account, newType);
      return client;
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
    clientId: string,
    accountId: string,
    amount: number,
    pixKey: string,
  ): { client: ClientDto; payment: PaymentDto } {
    const client = this.clients.find((client) => client.getId() === clientId);
    if (!client) {
      throw new Error('Cliente não encontrado!');
    }
    console.log('cliente que vai pagar o pix:', client.getId());

    const account = client
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
    console.log(client.getId(), 'atualiza o saldo do cliente');

    const clientDto = new ClientDto(client);
    const paymentDto = new PaymentDto(payment);
    console.log('clientDto:', clientDto);
    return { client: clientDto, payment: paymentDto };
  }

  // Fechar uma conta
  public closeAccount(clientId: string, accountId: string): Client {
    try {
      const client = this.getClientById(clientId);
      if (!client) {
        throw new Error('Cliente não encontrado!');
      }
      const account = client
        .getAccounts()
        .find((acc) => acc.getId() === accountId);
      if (!account) {
        throw new Error('Conta não encontrada!');
      }
      client.closeAccount(account);
      return client;
    } catch (error) {
      console.log('Houve um erro ao fechar a conta:', error);
    }
  }

  //Deletar cliente
  public deleteClient(clientId: string): void {
    this.clients = this.clients.filter((client) => client.getId() !== clientId);
  }
}
