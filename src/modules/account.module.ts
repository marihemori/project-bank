import { Module } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountController } from '../controllers/account.controller';
import { ClientModule } from './client.module';

@Module({
  imports: [ClientModule],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
