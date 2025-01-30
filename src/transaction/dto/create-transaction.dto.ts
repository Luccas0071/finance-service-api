import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TRANSACTION_TYPE } from '../enums/transaction_type.enum';
import { TRANSACTION_PERIOD } from '../enums/transaction_period.enum';
import { TRANSACTION_SITUATION } from '../enums/transaction_situation.enum';
import { TRANSACTION_METOD } from '../enums/transaction_metod.enum';

export class CreateTransactionDto {
  @IsString({ message: 'O campo "identification" deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo "identification" é obrigatório.' })
  identification: string;

  @IsDateString()
  @IsNotEmpty({ message: 'O campo "date" é obrigatório.' })
  date: string;

  @IsNumberString(
    {},
    {
      message:
        'O campo "value" deve ser um número válido em formato de string.',
    },
  )
  @IsNotEmpty({ message: 'O campo "value" é obrigatório.' })
  value: number;

  @IsOptional()
  @IsInt({ message: 'O campo "period_qty" deve ser um número inteiro.' })
  period_qty?: number;

  description?: string;

  @IsOptional()
  @IsEnum(TRANSACTION_TYPE, {
    message:
      'O campo "type" deve conter um dos valores válidos de TRANSACTION_TYPE.',
  })
  type?: TRANSACTION_TYPE;

  @IsOptional()
  @IsEnum(TRANSACTION_PERIOD, {
    message:
      'O campo "period" deve conter um dos valores válidos de TRANSACTION_PERIOD.',
  })
  period?: TRANSACTION_PERIOD;

  @IsOptional()
  @IsEnum(TRANSACTION_SITUATION, {
    message:
      'O campo "situation" deve conter um dos valores válidos de TRANSACTION_SITUATION.',
  })
  situation?: TRANSACTION_SITUATION;

  @IsOptional()
  @IsEnum(TRANSACTION_METOD, {
    message:
      'O campo "metod" deve conter um dos valores válidos de TRANSACTION_METOD.',
  })
  metod?: TRANSACTION_METOD;

  @IsOptional()
  @IsUUID('4', {
    message: 'O campo "transaction_id" deve ser um UUID versão 4 válido.',
  })
  transaction_id?: string;

  @IsOptional()
  @IsUUID('4', {
    message: 'O campo "card_id" deve ser um UUID versão 4 válido.',
  })
  card_id?: string;

  @IsOptional()
  @IsUUID('4', {
    message:
      'O campo "source_bank_account_id" deve ser um UUID versão 4 válido.',
  })
  source_bank_account_id?: string;

  @IsOptional()
  @IsUUID('4', {
    message:
      'O campo "destination_bank_account_id" deve ser um UUID versão 4 válido.',
  })
  destination_bank_account_id?: string;
}
