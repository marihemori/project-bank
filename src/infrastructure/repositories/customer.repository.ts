import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/domain/entity/customer.entity';
import { ICustomerRepository } from 'src/domain/interface/customer.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async findAll(): Promise<CustomerEntity[]> {
    // SELECT * FROM customer
    return await this.customerRepository.find();
  }

  async findById(id: string): Promise<CustomerEntity> | null {
    // SELECT * FROM customer WHERE id = ?
    return await this.customerRepository.findOneBy({ id });
  }

  async save(customer: CustomerEntity): Promise<CustomerEntity> {
    // INSERT INTO customer (...) VALUES (...)
    return await this.customerRepository.save(customer);
  }

  async update(id: string, customer: CustomerEntity): Promise<CustomerEntity> {
    // UPDATE customer SET ... WHERE id = ?
    return await this.customerRepository.save({ id, ...customer });
  }

  async delete(id: string): Promise<boolean> {
    // DELETE FROM customer WHERE id = ?
    const result = await this.customerRepository.delete({ id });
    return result.affected > 0;
  }
}
