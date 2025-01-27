import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CARD_TYPE } from '../enums/card_type.type';
import { BankAccount } from 'src/bankAccount/entities/bankAccount.entity';

export class CreateCardDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  identification: string;

  @IsString()
  @IsNotEmpty()
  balance: number;

  @IsString()
  @IsNotEmpty()
  limit: number;

  @IsString()
  @IsNotEmpty()
  due_date: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(CARD_TYPE)
  card_type: CARD_TYPE;

  @IsString()
  @IsNotEmpty()
  bank_account_id: BankAccount;
}
