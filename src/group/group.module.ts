import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';

import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupRepository } from './repositories/group.repository';
import { group_user } from './entities/group-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, group_user])],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
})
export class GroupModule {}
