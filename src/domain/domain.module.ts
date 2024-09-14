import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AccountService } from './services/account.service';
import { ClientService } from './services/client.service';
import { ManagerService } from './services/manager.service';
import { AccountEntity } from './entity/account.entity';
import { ClientEntity } from './entity/client.entity';
import { ManagerEntity } from './entity/manager.entity';

@Module({
  imports: [
    InfrastructureModule,
    TypeOrmModule.forFeature([AccountEntity, ClientEntity, ManagerEntity]),
  ],
  providers: [AccountService, ClientService, ManagerService],
  exports: [AccountService, ClientService, ManagerService],
})
export class DomainModule {}
