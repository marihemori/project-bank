import { v4 as uuidv4 } from 'uuid';
import { Account } from './account.model';
import { Manager } from './manager.model';

export class Client {
  public id: string;
  public fullName: string;
  public address: string;
  public phone: string;
  public income: number; // renda salarial
  public accounts: Account[];
  public manager: Manager;

  constructor(
    fullName: string,
    address: string,
    phone: string,
    income: number,
    manager: Manager,
  ) {
    this.id = uuidv4();
    this.fullName = fullName;
    this.address = address;
    this.phone = phone;
    this.income = income;
    this.accounts = [];
    this.manager = manager;
  }

  // criar conta
  openAccount(account: Account): void {
    this.accounts.push(account);
  }

  // fechar contar
  closeAccount(account: Account): void {
    this.accounts = this.accounts.filter((acc) => acc !== account);
  }

  // mudar tipo da conta
  changeAccountType(account: Account, newType): void {
    const index = this.accounts.indexOf(account);
    if (index !== 1) {
      this.accounts[index].accountType = newType;
    }
  }
}
