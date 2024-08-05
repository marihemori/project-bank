import { forwardRef, Module } from '@nestjs/common';
import { CustomerController } from '../controllers/customer.controller';
import { CustomerService } from '../services/customer.service';
import { AccountModule } from './account.module';

@Module({
  imports: [forwardRef(() => AccountModule)],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
