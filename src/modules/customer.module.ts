import { forwardRef, Module } from '@nestjs/common';
import { CustomerController } from '../application/controllers/customer.controller';
import { CustomerService } from '../domain/services/customer.service';
import { AccountModule } from './account.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from 'src/domain/entity/customer.entity';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    forwardRef(() => AccountModule),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
