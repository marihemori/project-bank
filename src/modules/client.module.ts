import { forwardRef, Module } from '@nestjs/common';
import { ClientController } from '../application/controllers/client.controller';
import { ClientService } from '../domain/services/client.service';
import { AccountModule } from './account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/domain/entity/client.entity';
import { ClientRepository } from 'src/infrastructure/repositories/client.repository';
import { AccountFactory } from 'src/domain/factories/account.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    forwardRef(() => AccountModule),
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository, AccountFactory],
  exports: [ClientService, ClientRepository],
})
export class ClientModule {}
