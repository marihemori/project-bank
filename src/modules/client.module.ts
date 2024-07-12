import { Module } from '@nestjs/common';
import { ClientController } from '../controllers/client.controller';
import { ClientService } from '../services/client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
