import { Entity, Column } from 'typeorm';
import { AccountType } from '../../enums/accountType.enum';
import { AccountEntity } from './account.entity';

@Entity('checkingAccount')
export class CheckingAccountEntity extends AccountEntity {
  @Column({ type: 'numeric' })
  protected interestRate: number; // taxa de juros

  constructor(balance: number, overdraft: number, interestRate: number) {
    super(balance, overdraft, AccountType.POUPANCA);
    this.interestRate = interestRate;
  }
}
