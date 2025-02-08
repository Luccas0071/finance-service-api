import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountModule } from 'src/bankAccount/bankAccount.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { typeOrmMySqlConfigAsync } from 'src/config/database/mySql/typeorm.mysql.config';
import { CardModule } from 'src/card/card.module';
import { AwsSqsModule } from 'src/clientServer/sqs/sqs.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { AuthModule } from 'src/auth/auth.module';
import { GroupModule } from 'src/group/group.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
// import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmMySqlConfigAsync),
    AuthModule,
    UserModule,
    GroupModule,
    AwsSqsModule,
    // ScheduleModule.forRoot(), //Ativar para rodar buscar as mensagens da fila SQS
    BankAccountModule,
    CardModule,
    TransactionModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
