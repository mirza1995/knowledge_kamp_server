import { FactoryProvider, Logger } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { ConfigService } from '@nestjs/config';

export const DB = Symbol('DB_SERVICE');
export type DbType = MySql2Database;

export const DbProvider: FactoryProvider = {
  provide: DB,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const logger = new Logger('DB');

    logger.debug('Connecting to PlanetScale...');

    const connection = connect({
      host: configService.get('DATABASE_HOST'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
    });

    logger.debug('Connected to PlanetScale!');

    return drizzle(connection);
  },
};
