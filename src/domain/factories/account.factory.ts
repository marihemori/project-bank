import { CreateClientDto } from 'src/application/dtos/createClient.dto';
import { AccountType } from '../enums/accountType.enum';
import { AccountEntity } from '../entity/account/account.entity';
import { CorrenteAccountEntity } from '../entity/account/correnteAccount.entity';
import { PoupancaAccountEntity } from '../entity/account/poupancaAccount.entity';

export class AccountFactory {
  createAccount(
    accountType: AccountType,
    initialBalance: number,
    client: CreateClientDto,
  ): AccountEntity {
    switch (accountType) {
      case AccountType.CORRENTE:
        return new CorrenteAccountEntity(initialBalance, client);
      case AccountType.POUPANCA:
        return new PoupancaAccountEntity(initialBalance, client);
      default:
        throw new Error('Account type not found');
    }
  }
}
