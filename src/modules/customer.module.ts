import { forwardRef, Module } from '@nestjs/common';
import { CustomerController } from '../application/controllers/customer.controller';
import { CustomerService } from '../domain/services/customer.service';
import { AccountModule } from './account.module';

@Module({
  imports: [forwardRef(() => AccountModule)],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
