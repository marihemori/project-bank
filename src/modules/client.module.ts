import { Module } from '@nestjs/common';
import { ClientController } from '../controllers/client.controller';
import { ClientService } from '../services/client.service';
import { ManagerService } from 'src/services/manager.service';

@Module({
  providers: [ClientService, ManagerService],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {}
