import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UUID } from 'crypto';
import { REGISTRATION_TYPE } from '../enums/registration_type.enum';

// Input
class InputGroupAdd {
  @IsUUID()
  @IsNotEmpty()
  id: UUID;
}

export class InputAddRegistrationGroup {
  @IsUUID()
  @IsNotEmpty()
  registration: UUID;

  @IsNotEmpty()
  @IsEnum(REGISTRATION_TYPE)
  type: REGISTRATION_TYPE;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => InputGroupAdd)
  groups: InputGroupAdd[];
}
