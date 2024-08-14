import { Module } from '@nestjs/common';
import { ManagerModule } from './modules/manager.module';
import { CustomerModule } from './modules/customer.module';
import { AccountModule } from './modules/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/entity/customer.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      entities: [Customer],
      synchronize: true,
    }),
    CustomerModule,
    ManagerModule,
    AccountModule,
  ],
})
export class AppModule {}
