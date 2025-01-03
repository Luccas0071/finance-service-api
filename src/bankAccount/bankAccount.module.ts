import { Module } from '@nestjs/common';

import { I_BANK_ACCOUNT_REPOSITORY } from '../common/constant';
import { BankAccountRepository } from './repositories/bankAccount.repository';
import { BankAccountController } from './bankAccount.controller';
import { BankAccountService } from './bankAccount.service';
import { BankAccount } from './entities/bankAccount.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { MySchema } from './my.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TypeOrmModule.forFeature([BankAccount, Card]),
    MongooseModule.forFeature([{ name: 'MyModel', schema: MySchema }]),
  ],
  controllers: [BankAccountController],
  providers: [
    BankAccountService,
    {
      provide: I_BANK_ACCOUNT_REPOSITORY,
      useClass: BankAccountRepository,
    },
  ],
})
export class BankAccountModule {}
