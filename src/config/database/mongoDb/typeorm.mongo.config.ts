import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    let host = configService.get('MONGO_HOST') || 'localhost';
    const env = configService.get('APPLICATION_ENV');
    if (env == 'test') host = 'localhost';

    return {
      name: 'mongo',
      type: 'mongodb',
      host,
      port: parseInt(configService.get('MONGO_PORT')),
      username: configService.get('MONGO_USERNAME'),
      password: configService.get('MONGO_PASSWORD'),
      database: configService.get('MONGO_DATABASE'),
      authSource: 'admin',
      entities: [],
      retryWrites: false,
      useUnifiedTopology: true,
    } as DataSourceOptions;
  }
}

export const typeOrmMongoConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  name: 'mongo',
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
