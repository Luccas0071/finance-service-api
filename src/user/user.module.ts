import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from './entities/userPermission.entity';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPermission])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
