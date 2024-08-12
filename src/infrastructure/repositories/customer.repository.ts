import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/domain/entity/customer.entity';
import { Repository } from 'typeorm';

export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    // SELECT * FROM customer
    return await this.customerRepository.find();
  }

  async save(customer: Customer): Promise<Customer> {
    // INSERT INTO customer (...) VALUES (...)
    return await this.customerRepository.save(customer);
  }
}
