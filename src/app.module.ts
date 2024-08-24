import { Module } from '@nestjs/common';
import { ManagerModule } from './modules/manager.module';
import { ClientModule } from './modules/client.module';
import { AccountModule } from './modules/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AccountEntity } from './domain/entity/account/account.entity';
import { ClientEntity } from './domain/entity/client.entity';
import { ManagerEntity } from './domain/entity/manager.entity';

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
      entities: [AccountEntity, ClientEntity, ManagerEntity],
      synchronize: true,
    }),
    ClientModule,
    ManagerModule,
    AccountModule,
  ],
})
export class AppModule {}
