import { forwardRef, Module } from '@nestjs/common';
import { AccountService } from '../domain/services/account.service';
import { AccountController } from '../application/controllers/account.controller';
import { CustomerModule } from './customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/domain/entity/account/account.entity';
import { AccountRepository } from 'src/infrastructure/repositories/account.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    forwardRef(() => CustomerModule),
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountService, AccountRepository],
})
export class AccountModule {}
