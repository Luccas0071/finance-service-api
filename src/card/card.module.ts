import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { CardRepository } from './repositories/card.repository';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { BankAccountModule } from 'src/bankAccount/bankAccount.module';
import { BankAccountRepository } from 'src/bankAccount/repositories/bankAccount.repository';
import { BankAccount } from 'src/bankAccount/entities/bankAccount.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repositories/user.repository';

// import { SqsPublisher } from 'src/clientServer/sqs/sqs.publisher';
// import { SqsClient } from 'src/clientServer/sqs/sqs.client';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, BankAccount, User]),
    BankAccountModule,
    UserModule,
  ],
  controllers: [CardController],
  providers: [
    CardService,
    CardRepository,
    BankAccountRepository,
    UserRepository,
  ],
})
export class CardModule {}
