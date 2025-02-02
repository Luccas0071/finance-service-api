import { IsOptional, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password?: string;
}
