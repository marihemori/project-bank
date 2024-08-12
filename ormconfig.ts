import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env
dotenv.config();

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'defaultUser',
  password: process.env.POSTGRES_PASSWORD || 'defaultPassword',
  database: process.env.POSTGRES_DB || 'defaultDatabase',
  entities: ['src/domain/entities/**.ts'],
  synchronize: true,
};

export default config;
