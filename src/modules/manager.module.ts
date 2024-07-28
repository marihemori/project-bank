import { Module } from '@nestjs/common';
import { ManagerController } from '../controllers/manager.controller';
import { ManagerService } from '../services/manager.service';
import { ClientService } from 'src/services/client.service';
import { ClientModule } from './client.module';

@Module({
  imports: [ClientModule],
  controllers: [ManagerController],
  providers: [ManagerService, ClientService],
  exports: [ManagerService],
})
export class ManagerModule {}
