import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UpdateGroupDto } from './dto/update-group';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { InputAddUserGroup } from './dto/input-add-user-grupo.dto';

@UseGuards(AuthTokenGuard)
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
  async create(
    @Body() group: CreateGroupDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.groupService.create(group, tokenPayload.sub);
  }

  @Get()
  async findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.groupService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() group: UpdateGroupDto) {
    return this.groupService.update(id, group);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }

  @Post('add-user-group')
  async addUserToGroup(@Body() input: InputAddUserGroup) {
    return this.groupService.addUserToGroup(input);
  }

  @Post('remove-user-group')
  async removeUserFromGroup(@Body() input: InputAddUserGroup) {
    return this.groupService.removeUserFromGroup(input);
  }
}
