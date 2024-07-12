import { Account } from './account.model';
import { Observer } from './observer.model';

export class ObservableAccount extends Account {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  unregisterObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  deposit(value: number): void {
    super.deposit(value);
    this.notifyObservers();
  }

  withdraw(value: number): void {
    super.withdraw(value);
    this.notifyObservers();
  }
}
