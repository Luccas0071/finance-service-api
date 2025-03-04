import { IsEnum, IsOptional, IsString } from 'class-validator';
import { HOLDER_TYPE } from '../enums/holder_type.type';
import { ACCOUNT_TYPE } from '../enums/account_type.type';

export class UpdateBankAccountDto {
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  identification: string;

  @IsOptional()
  balance: number;

  @IsOptional()
  @IsEnum(ACCOUNT_TYPE)
  account_type: ACCOUNT_TYPE;

  @IsOptional()
  @IsEnum(HOLDER_TYPE)
  holder_type: HOLDER_TYPE;

  description: string;

  created_at: Date;

  updated_at: Date;
}
