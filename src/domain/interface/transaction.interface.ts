import { TransactionEntity } from '../entity/transaction.entity';
export interface ITransactionRepository {
  findAll(): Promise<TransactionEntity[]>;
  findById(id: string): Promise<TransactionEntity> | null;
  save(transaction: TransactionEntity): Promise<TransactionEntity>;
  update(
    id: string,
    transaction: TransactionEntity,
  ): Promise<TransactionEntity>;
  delete(id: string): Promise<boolean>;
}
