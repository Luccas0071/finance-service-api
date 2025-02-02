import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  identification: string;

  @IsOptional()
  @IsString()
  user_id: User;
}
