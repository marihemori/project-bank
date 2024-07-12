import { Account } from './account.model';

export interface Observer {
  update(account: Account): void;
}

export class AccountObserver implements Observer {
  update(account: Account): void {
    console.log(`Account ${account.id} updated!`);
  }
}
