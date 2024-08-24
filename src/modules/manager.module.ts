import { Module } from '@nestjs/common';
import { ManagerController } from '../application/controllers/manager.controller';
import { ManagerService } from '../domain/services/manager.service';
import { ManagerRepository } from 'src/infrastructure/repositories/manager.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from 'src/domain/entity/manager.entity';
import { ClientModule } from './client.module';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity]), ClientModule],
  controllers: [ManagerController],
  providers: [
    ManagerService,
    ManagerRepository,
    { provide: 'IManagerRepository', useClass: ManagerRepository },
  ],
  exports: [ManagerService, ManagerRepository],
})
export class ManagerModule {}
