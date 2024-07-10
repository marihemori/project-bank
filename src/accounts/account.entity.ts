import { v4 as uuidv4 } from 'uuid';
import { Module } from '@nestjs/common';

@Module({})
export class Account {
  public id: string;
  public balance: number;
  public accountType: 'Checking' | 'Savings';

  constructor(balance: number, accountType: 'Checking' | 'Savings') {
    this.id = uuidv4();
    this.balance = balance;
    this.accountType = accountType;
  }
}
