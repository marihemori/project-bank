import { CheckingAccount } from '../../domain/entity/checkingAccount.model';
import { Manager } from '../../domain/entity/manager.model';
import { SavingsAccount } from '../../domain/entity/savingsAccount.model';

export class CustomerDto {
  id: string;
  fullName: string;
  address: string;
  phone: string;
  income: number;
  accounts: (CheckingAccount | SavingsAccount)[] = [];
  manager?: Manager;

  constructor(customer) {
    this.id = customer.getId();
    this.fullName = customer.getFullName();
    this.address = customer.getAddress();
    this.phone = customer.getPhone();
    this.income = customer.getIncome();
    this.accounts = customer.getAccounts();
    this.manager = customer.getManager();
  }
}
