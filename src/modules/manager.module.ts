import { Module } from '@nestjs/common';
import { ManagerController } from '../controllers/manager.controller';
import { ManagerService } from '../services/manager.service';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
