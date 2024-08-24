import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { CustomerController } from './controllers/client.controller';
import { ManagerController } from './controllers/manager.controller';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [AccountController, CustomerController, ManagerController],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
