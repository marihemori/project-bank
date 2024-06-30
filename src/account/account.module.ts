import { Module } from '@nestjs/common';

@Module({})
export class AccountModule {
  private balance: number; // saldo

  constructor() {
    this.balance = 0; // saldo inicial
  }
}
