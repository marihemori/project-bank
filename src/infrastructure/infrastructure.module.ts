import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/domain/entity/account/account.entity';
import { ClientEntity } from 'src/domain/entity/client.entity';
import { ManagerEntity } from 'src/domain/entity/manager.entity';
import { AccountRepository } from './repositories/account.repository';
import { ClientRepository } from './repositories/client.repository';
import { ManagerRepository } from './repositories/manager.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, ClientEntity, ManagerEntity]),
  ], // Configura o TypeORM para usar as entidades necessárias
  providers: [
    AccountRepository,
    { provide: 'IAccountRepository', useClass: AccountRepository }, // Implementação da interface do domínio
    ClientRepository,
    { provide: 'IClientRepository', useClass: ClientRepository },
    ManagerRepository,
    { provide: 'IManagerRepository', useClass: ManagerRepository },
  ],
  exports: ['IAccountRepository', 'IClientRepository', 'IManagerRepository'], // Exporta o token para outros módulos
})
export class InfrastructureModule {}
