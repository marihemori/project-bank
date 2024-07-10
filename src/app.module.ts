import { Module } from '@nestjs/common';
import { ManagerModule } from './managers/manager.module';
import { ClientModule } from './clients/client.module';
import { AccountModule } from './accounts/accout.module';

@Module({
  imports: [ClientModule, ManagerModule, AccountModule],
})
export class AppModule {}
