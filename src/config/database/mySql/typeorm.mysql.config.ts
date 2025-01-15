import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { BankAccount } from 'src/bankAccount/entities/bankAccount.entity';
import { Card } from 'src/bankAccount/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSourceOptions, LoggerOptions } from 'typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: configService.get('DB_TYPE'),
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT') || 3306,
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASS'),
      database: configService.get('DB_NAME'),
      entities: [BankAccount, Card, User],
      autoLoadEntities: configService.get<string>('DB_LOAD_ENT') === 'true',
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
