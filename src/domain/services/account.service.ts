import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Account } from '../models/account.model';
import { Client } from '../models/client.model';
import { ClientService } from './client.service';
// import { AccountRepository } from 'src/infrastructure/repositories/account.repository';
import { InjectRepository } from '@nestjs/typeorm';
// import {
//   TransactionEntity,
//   TransactionType,
// } from '../entity/transaction.entity';
import { Repository } from 'typeorm';
import { AccountEntity } from '../entity/account/account.entity';

@Injectable()
export class AccountService {
  private accounts: Account[] = [];
  private clients: Client[] = [];

  constructor(
    @Inject(forwardRef(() => ClientService))
    private readonly clientService: ClientService,

    // injeção de dependência da conta
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    // injeção de dependência da transferência
    // @InjectRepository(TransactionEntity)
    // private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  // Obter historico de transferências
  // public async getTransactionHistory(
  //   accountId: string,
  // ): Promise<TransactionEntity[]> {
  //   return this.transactionRepository.find({
  //     where: { account: { id: accountId } },
  //     order: { createdAt: 'DESC' },
  //   });
  // }

  // Encontrar conta pelo id
  public async getAccountById(accountId: string): Promise<Account> {
    const account = this.accounts.find(
      (account) => account.getId() === accountId,
    );
    if (!account) {
      throw new Error('Conta não encontrada!');
    }
    return account;
  }

  // Verificar saldo
  // public async verifyBalance(
  //   clientId: string,
  //   accountId: string,
  // ): Promise<any> {
  //   const client = this.clientService.getClientById(clientId);
  //   if (!client) {
  //     throw new Error('Cliente não encontrado!');
  //   }
  //   const account = client
  //     .getAccounts()
  //     .find((acc) => acc.getId() === accountId);

  //   if (!account) {
  //     throw new Error('Conta não encontrada!');
  //   }
  //   return account; // Retorna o objeto Account
  // }

  // // Adicionar conta
  // public async addAccount(account: Account): Promise<void> {
  //   this.accounts.push(account);
  // }

  // Depositar
  // public async deposit(
  //   accountId: string,
  //   clientId: string,
  //   amount: number,
  // ): Promise<void> {
  //   const client = this.clientService.getClientById(clientId);
  //   if (!client) {
  //     throw new Error('Cliente não encontrado!');
  //   }

  //   const account = client
  //     .getAccounts()
  //     .find((acc) => acc.getId() === accountId);

  //   if (!account) {
  //     throw new Error('Conta não encontrada!');
  //   }

  //   account.deposit(amount);

  // Registro da transação
  // const transaction = new TransactionEntity();
  // transaction.type = TransactionType.DEPOSIT;
  // transaction.amount = amount;
  // transaction.account = account;
  // await this.transactionRepository.save(transaction);
}

// Sacar
// public async withdraw(
//   accountId: string,
//   clientId: string,
//   amount: number,
// ): Promise<void> {
//   const client = this.clientService.getClientById(clientId);
//   if (!client) {
//     throw new Error('Cliente não encontrado!');
//   }

//   const account = client
//     .getAccounts()
//     .find((acc) => acc.getId() === accountId);
//   console.log(account);
//   if (!account) {
//     throw new Error('Conta não encontrada!');
//   }

//   const newBalance = account.getBalance() - amount;
//   if (newBalance < 0) {
//     throw new Error('Saldo insuficiente para saque!');
//   } else {
//     account.setBalance(newBalance);
//   }

// Registro da transação
// const transaction = new TransactionEntity();
// transaction.type = TransactionType.WITHDRAW;
// transaction.amount = amount;
// transaction.account = account;
// await this.transactionRepository.save(transaction);
// }

// transferir
// public async transfer(
//   fromAccountId: string, // id da conta de origem
//   toAccountId: string, // id da conta de destino
//   clientIdFrom: string, // id do cliente de origem
//   clientIdTo: string, // id do cliente de destino
//   amount: number, // valor da transferência
// ): Promise<{ fromAccount: Account; toAccount: Account }> {
//   // obter o cliente de origem
//   const clientFrom = this.clientService.getClientById(clientIdFrom);
//   if (!clientFrom) {
//     throw new Error('Cliente de origem não encontrado!');
//   }
//   console.log('cliente que vai transferir:', clientFrom.getId());

//   // obter o cliente de destino
//   const clientTo = this.clientService.getClientById(clientIdTo);
//   if (!clientTo) {
//     throw new Error('Cliente de destino não encontrado!');
//   }

//   // obter as contas de origem
//   const fromAccount = clientFrom
//     .getAccounts()
//     .find((acc) => acc.getId() === fromAccountId);
//   if (!fromAccount) {
//     throw new Error('Conta de origem não encontrada!');
//   }

//   // obter as contas de destino
//   const toAccount = clientTo
//     .getAccounts()
//     .find((acc) => acc.getId() === toAccountId);
//   if (!toAccount) {
//     throw new Error('Conta de destino não encontrada!');
//   }

//   // verificar o saldo e realizar a transferência
//   if (fromAccount.getBalance() >= amount) {
//     const newFromBalance = fromAccount.getBalance() - amount;
//     const newToBalance = toAccount.getBalance() + amount;
//     fromAccount.setBalance(newFromBalance);
//     toAccount.setBalance(newToBalance);

// Registro para a conta de origem
// const fromTransaction = new TransactionEntity();
// fromTransaction.type = TransactionType.TRANSFER;
// fromTransaction.amount = -amount;
// fromTransaction.account = fromAccount;
// await this.transactionRepository.save(fromTransaction);

// Registro para a conta de destino
// const toTransaction = new TransactionEntity();
// toTransaction.type = TransactionType.TRANSFER;
// toTransaction.amount = amount;
// toTransaction.account = toAccount;
// await this.transactionRepository.save(toTransaction);
//     } else {
//       throw new Error('Saldo insuficiente para transferência!');
//     }

//     return { fromAccount, toAccount };
//   }
// }
