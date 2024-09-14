import { AccountType } from '../enums/accountType.enum';
import { AccountEntity } from '../entity/account/account.entity';
import { CurrentAccountEntity } from '../entity/account/currentAccount.entity';
import { SavingsAccountEntity } from '../entity/account/savingsAccount.entity';
import { ClientEntity } from '../entity/client.entity';

export class AccountFactory {
  createAccount(
    accountType: AccountType,
    initialBalance: number,
    overdraft: number,
    client: ClientEntity,
    interestedRate: number,
  ): AccountEntity {
    const accountTypes = {
      [AccountType.CURRENT]: new CurrentAccountEntity(
        initialBalance,
        overdraft,
        client,
      ),
      [AccountType.SAVINGS]: new SavingsAccountEntity(
        initialBalance,
        interestedRate,
        client,
      ),
    };

    const account = accountTypes[accountType];

    if (!account) {
      throw new Error('Tipo de conta não encontrado!');
    }

    return account;
  }
}
