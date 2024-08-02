import { Module } from '@nestjs/common';
import { CustomerController } from '../controllers/customer.controller';
import { CustomerService } from '../services/customer.service';

@Module({
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
