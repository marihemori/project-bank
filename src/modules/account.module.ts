import { forwardRef, Module } from '@nestjs/common';
import { AccountService } from '../domain/services/account.service';
import { AccountController } from '../application/controllers/account.controller';
import { CustomerModule } from './customer.module';

@Module({
  imports: [forwardRef(() => CustomerModule)],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
