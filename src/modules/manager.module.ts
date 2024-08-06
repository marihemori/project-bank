import { Module } from '@nestjs/common';
import { ManagerController } from '../controllers/manager.controller';
import { ManagerService } from '../services/manager.service';
import { CustomerModule } from './customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
