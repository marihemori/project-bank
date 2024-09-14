import { AccountEntity } from '../entity/account/account.entity';

export interface IAccountRepository {
  findAll(): Promise<AccountEntity[]>;
  findById(id: string): Promise<AccountEntity> | null;
  save(account: AccountEntity): Promise<AccountEntity>;
  update(id: string, account: AccountEntity): Promise<AccountEntity>;
  delete(id: string): Promise<boolean>;
}
