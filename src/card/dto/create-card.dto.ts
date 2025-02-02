import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CARD_TYPE } from '../enums/card_type.type';
import { BankAccount } from 'src/bankAccount/entities/bankAccount.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  identification: string;

  @IsString()
  @IsNotEmpty()
  balance: number;

  @IsString()
  @IsNotEmpty()
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  due_date: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(CARD_TYPE)
  card_type: CARD_TYPE;

  @IsString()
  @IsNotEmpty()
  bank_account_id: BankAccount;

  @IsOptional()
  @IsString()
  user_id: User;
}
