import { Customer } from 'src/domain/models/customer.model';
import { CheckingAccount } from '../../domain/models/checkingAccount.model';
import { SavingsAccount } from '../../domain/models/savingsAccount.model';

export class CustomerDto {
  id: string;
  fullname: string;
  address: string;
  phone: string;
  income: number;
  accounts: (CheckingAccount | SavingsAccount)[] = [];
  managerId?: string;

  constructor(customer: Customer) {
    this.id = customer.getId();
    this.fullname = customer.getFullname();
    this.address = customer.getAddress();
    this.phone = customer.getPhone();
    this.income = customer.getIncome();
    this.accounts = customer.getAccounts();
    this.managerId = customer.getManager()?.getId();
  }
}
