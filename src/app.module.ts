import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerBankModule } from './manager/manager-bank.module';
import { ClientService } from './client/client.service';
import { ClientController } from './client/client.controller';
import { ClientModule } from './client/client.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [ClientModule, ManagerBankModule, AccountModule],
  controllers: [AppController, ClientController],
  providers: [AppService, ClientService],
})
export class AppModule {}
