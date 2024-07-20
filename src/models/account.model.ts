import { v4 as uuidv4 } from 'uuid';

export abstract class Account {
  protected id: string; // id da conta
  protected balance: number; // saldo
  protected overdraft: number; // cheque especial
  protected accountType: 'Corrente' | 'Poupança'; // tipo de conta

  constructor(
    balance: number,
    overdraft: number,
    accountType: 'Corrente' | 'Poupança',
  ) {
    this.id = uuidv4();
    this.balance = balance;
    this.overdraft = overdraft;
    this.accountType = accountType;
  }

  public getId(): string {
    return this.id;
  }

  // obter saldo
  public getBalance(): number {
    return this.balance;
  }

  // atualiza o valor do saldo
  public setBalance(newBalance: number): void {
    this.balance = newBalance;
  }

  public getOverdraft(): number {
    return this.overdraft;
  }

  public getAccountType(): 'Checking' | 'Savings' {
    return this.accountType;
  }

  // obter a quantidade de dinheiro disponivel somado com saldo + cheque especial
  public getAvailableFunds(): number {
    return this.balance + this.overdraft;
  }

  public processPayment(value: number): void {
    const availableFunds = this.getAvailableFunds();
    if (value <= availableFunds) {
      this.balance -= value;
    } else {
      throw new Error('Saldo insuficiente!');
    }
  }

  // depositar
  abstract deposit(amount: number): void;
  // sacar
  abstract withdraw(amount: number): void;
  // transfer
  abstract transfer(destination: Account, amount: number);
}
