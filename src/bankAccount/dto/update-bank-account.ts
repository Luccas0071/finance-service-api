import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { HOLDER_TYPE } from '../enums/holder_type.type';
import { ACCOUNT_TYPE } from '../enums/account_type.type';

export class UpdateBankAccountDto {
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  identification: string;

  balance: number;

  @IsEnum(ACCOUNT_TYPE)
  account_type: ACCOUNT_TYPE;

  @IsEnum(HOLDER_TYPE)
  holder_type: HOLDER_TYPE;

  description: string;

  created_at: Date;

  updated_at: Date;
}
