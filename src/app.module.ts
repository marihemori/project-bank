import { Module } from '@nestjs/common';
import { ManagerModule } from './modules/manager.module';
import { ClientModule } from './modules/client.module';
import { AccountModule } from './modules/account.module';

@Module({
  imports: [ClientModule, ManagerModule, AccountModule],
})
export class AppModule {}
