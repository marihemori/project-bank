import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/domain/entity/account/account.entity';
import { Injectable } from '@nestjs/common';
import { IAccountRepository } from 'src/domain/interface/account.interface';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async findAll(): Promise<AccountEntity[]> {
    // SELECT * FROM account
    return await this.accountRepository.find();
  }

  async findById(id: string): Promise<AccountEntity> | null {
    // SELECT * FROM account WHERE id = ?
    return await this.accountRepository.findOneBy({ id });
  }

  async save(account: AccountEntity): Promise<AccountEntity> {
    // INSERT INTO account (id, balance) VALUES (?, ?)
    return await this.accountRepository.save(account);
  }

  async update(id: string, account: AccountEntity): Promise<AccountEntity> {
    // UPDATE account SET balance = ?, overdraft = ? WHERE id = ?
    return await this.accountRepository.save({ id, ...account });
  }

  async delete(id: string): Promise<boolean> {
    // DELETE FROM account WHERE id = ?
    const result = await this.accountRepository.delete({ id });
    return result.affected > 0;
  }
}
