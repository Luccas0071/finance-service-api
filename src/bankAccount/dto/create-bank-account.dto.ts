// import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { HOLDER_TYPE } from '../enums/holder_type.type';
import { ACCOUNT_TYPE } from '../enums/account_type.type';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
// import { Type } from 'class-transformer';
// import { CreateCardDto } from 'src/card/dto/create-card.dto';

export class CreateBankAccountDto {
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

  // @ValidateNested({ each: true })
  // @Type(() => CreateCardDto)
  // cards: CreateCardDto[]; // Array de objetos validados com CreateCardDto

  created_at: Date;

  updated_at: Date;
}
