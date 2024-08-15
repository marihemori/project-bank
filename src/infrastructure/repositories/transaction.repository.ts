import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/domain/entity/transaction.entity';
import { ITransactionRepository } from 'src/domain/interface/transaction.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async findAll(): Promise<TransactionEntity[]> {
    return await this.transactionRepository.find();
  }

  async findById(id: string): Promise<TransactionEntity> | null {
    return await this.transactionRepository.findOneBy({ id });
  }

  async save(transaction: TransactionEntity): Promise<TransactionEntity> {
    return await this.transactionRepository.save(transaction);
  }

  async update(
    id: string,
    transaction: TransactionEntity,
  ): Promise<TransactionEntity> {
    return await this.transactionRepository.save({
      ...transaction,
      id,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.transactionRepository.delete({ id });
    return result.affected > 0;
  }
}
