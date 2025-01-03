import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from './entities/userPermission.entity copy';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPermission])],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
