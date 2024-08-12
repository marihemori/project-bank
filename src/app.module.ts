import { Module } from '@nestjs/common';
import { ManagerModule } from './modules/manager.module';
import { CustomerModule } from './modules/customer.module';
import { AccountModule } from './modules/account.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/entity/customer.entity';

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DATABASE_HOST,
      port: parseInt(DATABASE_PORT, 10),
      database: DATABASE_NAME,
      username: DABASE_USERNAME,
      password: DATABASE_PASSWORD,
      entities: [Customer],
      synchronize: true,
    }),
    CustomerModule,
    ManagerModule,
    AccountModule,
  ],
})
export class AppModule {}
