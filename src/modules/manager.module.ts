import { Module } from '@nestjs/common';
import { ManagerController } from '../application/controllers/manager.controller';
import { ManagerService } from '../domain/services/manager.service';
import { ManagerRepository } from 'src/infrastructure/repositories/manager.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from 'src/domain/entity/manager.entity';
import { CustomerModule } from './customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity]), CustomerModule],
  controllers: [ManagerController],
  providers: [ManagerService, ManagerRepository],
  exports: [ManagerService, ManagerRepository],
})
export class ManagerModule {}
