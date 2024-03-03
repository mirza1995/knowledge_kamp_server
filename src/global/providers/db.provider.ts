import { FactoryProvider, Logger } from '@nestjs/common';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';

export const DB = Symbol('DB_SERVICE');
export type DbType = PostgresJsDatabase;

export const DbProvider: FactoryProvider = {
  provide: DB,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const logger = new Logger('DB');

    logger.debug('Connecting to Supabase...');

    const connectionString = configService.get('DATABASE_URL');

    // Disable prefetch as it is not supported for "Transaction" pool mode
    const client = postgres(connectionString, { prepare: false });
    const db = drizzle(client);

    logger.debug('Connected to Supabase!');

    return db;
  },
};
