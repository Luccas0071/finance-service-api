import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { User } from 'src/user/entities/user.entity';

export class UpdateGroupDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  identification: string;

  @IsOptional()
  @IsString()
  user_id: User;
}
