import { Account } from '../../domain/entity/account.model';

export class AccountDto {
  id: string;
  balance: number;
  overdraft: number;
  accountType: 'Corrente' | 'Poupança';

  constructor(account: Account) {
    this.id = account.getId();
    this.balance = account.getBalance();
    this.overdraft = account.getOverdraft();
    this.accountType = account.getAccountType();
  }
}
