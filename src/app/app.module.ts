import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountModule } from 'src/bankAccount/bankAccount.module';
// import { PostgresConfigService } from 'src/config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { typeOrmMySqlConfigAsync } from 'src/config/database/mySql/typeorm.mysql.config';
// import { typeOrmMongoConfigAsync } from 'src/config/database/mongoDb/typeorm.mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   useClass: PostgresConfigService,
    //   inject: [PostgresConfigService],
    // }),

    TypeOrmModule.forRootAsync(typeOrmMySqlConfigAsync),
    // TypeOrmModule.forRootAsync(typeOrmMongoConfigAsync),
    BankAccountModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
