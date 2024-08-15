import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { ManagerService } from './services/manager.service';
import { AccountEntity } from './entity/account/account.entity';
import { CustomerEntity } from './entity/customer.entity';
import { ManagerEntity } from './entity/manager.entity';

@Module({
  imports: [
    InfrastructureModule,
    TypeOrmModule.forFeature([AccountEntity, CustomerEntity, ManagerEntity]),
  ],
  providers: [AccountService, CustomerService, ManagerService],
  exports: [AccountService, CustomerService, ManagerService],
})
export class DomainModule {}
