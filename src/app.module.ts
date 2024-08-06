import { Module } from '@nestjs/common';
import { ManagerModule } from './modules/manager.module';
import { CustomerModule } from './modules/customer.module';
import { AccountModule } from './modules/account.module';

@Module({
  imports: [CustomerModule, ManagerModule, AccountModule],
})
export class AppModule {}
