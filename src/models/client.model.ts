import { v4 as uuidv4 } from 'uuid';
import { Account } from './account.model';
import { Manager } from './manager.model';
import { CheckingAccount } from './checkingAccount.model';
import { SavingsAccount } from './savingsAccount.model';

export class Client {
  private id: string;
  private fullName: string;
  private address: string;
  private phone: string;
  private income: number; // renda salarial
  private accounts: (CheckingAccount | SavingsAccount)[] = [];
  private manager?: Manager;

  constructor(
    fullName: string,
    address: string,
    phone: string,
    income: number,
    account: CheckingAccount | SavingsAccount,
    manager?: Manager,
  ) {
    this.id = uuidv4();
    this.fullName = fullName;
    this.address = address;
    this.phone = phone;
    this.income = income;
    this.manager = manager;
    this.accounts.push(account);
  }

  public getId(): string {
    return this.id;
  }

  public getFullName(): string {
    return this.fullName;
  }

  public getAddress(): string {
    return this.address;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getIncome(): number {
    return this.income;
  }

  public getAccounts(): (CheckingAccount | SavingsAccount)[] {
    return this.accounts;
  }

  public getManager(): Manager {
    return this.manager;
  }

  // abrir conta
  public createAccount(
    accountType: 'Corrente' | 'Poupança',
    initialBalance: number,
  ): Account {
    const overdraft = accountType === 'Corrente' ? 100 : 0;
    if (accountType === 'Corrente') {
      if (initialBalance < 500) {
        throw new Error(
          'O saldo inicial deve ser de pelo menos R$ 500,00 para abrir uma conta corrente.',
        );
      }
      return new CheckingAccount(initialBalance, overdraft);
    } else {
      return new SavingsAccount(initialBalance, overdraft, 0.01);
    }
  }

  // fechar contar
  public closeAccount(account: Account): void {
    this.accounts = this.accounts.filter(
      (acc) => acc.getId() !== account.getId(),
    );
  }

  // mudar tipo da conta
  public changeAccountType(
    account: Account,
    newType: 'Checking' | 'Savings',
  ): void {
    this.closeAccount(account);
    this.createAccount(newType, 0);
  }
}
