import { Module } from '@nestjs/common';
import { ManagerController } from '../application/controllers/manager.controller';
import { ManagerService } from '../domain/services/manager.service';
import { CustomerModule } from './customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
