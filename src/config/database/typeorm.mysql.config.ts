import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSourceOptions, LoggerOptions } from 'typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    let host = configService.get('DB_HOST') || 'localhost';
    let dbName = configService.get('DB_NAME');
    const env = configService.get('APPLICATION_ENV');
    if (env == 'test') {
      host = 'localhost';
      dbName = 'service-omni-hub-test';
    }
    return {
      name: 'default',
      type: configService.get('DB_TYPE'),
      host,
      port: configService.get('DB_PORT') || 3306,
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASS'),
      database: dbName,
      entities: [
        __dirname + '/../bankAccount/entities/*.entity{.ts,.js',
        __dirname + '/../user/entities/*.entity{.ts,.js',
      ],
      migrations: [__dirname + '/../database/mysql/migrations/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: configService.get<string>('DB_SYNC') === 'true',
      logging: configService.get<LoggerOptions>('DB_LOG') || false,
    } as DataSourceOptions;
  }
}

export const typeOrmMySqlConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  name: 'default',
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
