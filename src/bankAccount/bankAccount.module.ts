import { Module } from '@nestjs/common';

import { BankAccountRepository } from './repositories/bankAccount.repository';
import { BankAccountController } from './bankAccount.controller';
import { BankAccountService } from './bankAccount.service';
import { BankAccount } from './entities/bankAccount.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/card/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount, Card])],
  controllers: [BankAccountController],
  providers: [BankAccountService, BankAccountRepository],
})
export class BankAccountModule {}
