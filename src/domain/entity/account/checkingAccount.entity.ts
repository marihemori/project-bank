import { Entity } from 'typeorm';
import { AccountType } from '../../enums/accountType.enum';
import { AccountEntity } from './account.entity';

@Entity('checkingAccount')
export class CheckingAccountEntity extends AccountEntity {
  constructor(balance: number, overdraft: number) {
    super(balance, overdraft, AccountType.CORRENTE);
  }
}
