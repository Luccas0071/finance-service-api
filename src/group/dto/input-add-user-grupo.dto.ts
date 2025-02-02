import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';

// Input
class InputUserAdd {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;
}

export class InputAddUserGroup {
  @IsUUID()
  @IsNotEmpty()
  group_id: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => InputUserAdd)
  users: InputUserAdd[];
}
