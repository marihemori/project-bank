import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/domain/entity/account/account.entity';
import { CustomerEntity } from 'src/domain/entity/customer.entity';
import { ManagerEntity } from 'src/domain/entity/manager.entity';
import { AccountRepository } from './repositories/account.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { ManagerRepository } from './repositories/manager.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, CustomerEntity, ManagerEntity]),
  ], // Configura o TypeORM para usar as entidades necessárias
  providers: [
    AccountRepository,
    { provide: 'IAccountRepository', useClass: AccountRepository }, // Implementação da interface do domínio
    CustomerRepository,
    { provide: 'ICustomerRepository', useClass: CustomerRepository },
    ManagerRepository,
    { provide: 'IManagerRepository', useClass: ManagerRepository },
  ],
  exports: ['IAccountRepository', 'ICustomerRepository', 'IManagerRepository'], // Exporta o token para outros módulos
})
export class InfrastructureModule {}
