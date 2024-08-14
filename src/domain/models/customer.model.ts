import { v4 as uuidv4 } from 'uuid';
import { Account } from './account.model';
import { Manager } from './manager.model';
import { CheckingAccount } from './checkingAccount.model';
import { SavingsAccount } from './savingsAccount.model';

export class Customer {
  private id: string;
  private fullname: string;
  private address: string;
  private phone: string;
  private income: number; // renda salarial
  private accounts: (CheckingAccount | SavingsAccount)[] = [];
  private manager?: Manager;

  constructor(
    fullname: string,
    address: string,
    phone: string,
    income: number,
    manager?: Manager,
  ) {
    this.id = uuidv4();
    this.fullname = fullname;
    this.address = address;
    this.phone = phone;
    this.income = income;
    this.manager = manager;
  }

  public getId(): string {
    return this.id;
  }

  public getFullname(): string {
    return this.fullname;
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

  public setManager(manager: Manager): void {
    this.manager = manager;
  }

  public addAccount(account: CheckingAccount | SavingsAccount): void {
    this.accounts.push(account);
  }

  // Abrir uma conta para o cliente
  public openAccount(
    accountType: typeof CheckingAccount | typeof SavingsAccount,
  ): Account {
    if (accountType === CheckingAccount && this.income < 500) {
      throw new Error(
        'A renda deve ser de pelo menos R$500,00 para abrir uma conta corrente!',
      );
    }
    if (accountType === CheckingAccount && this.income > 500) {
      const account = new CheckingAccount(0, 100);
      this.addAccount(account);
      return account;
    }
    if (accountType === SavingsAccount) {
      const account = new SavingsAccount(0, 0, 0.01);
      this.addAccount(account);
      return account;
    }
  }

  // Fechar conta do cliente
  public closeAccount(account: Account): void {
    this.accounts = this.accounts.filter(
      (acc) => acc.getId() !== account.getId(),
    );
  }

  // Mudar tipo da conta do cliente
  public changeAccountType(
    account: Account,
    newType: typeof CheckingAccount | typeof SavingsAccount,
  ): void {
    this.closeAccount(account);
    let newAccount;
    if (newType === CheckingAccount) {
      newAccount = new CheckingAccount(0, 100);
    } else {
      newAccount = new SavingsAccount(0, 0, 0.01);
    }
    this.addAccount(newAccount);
  }
}
