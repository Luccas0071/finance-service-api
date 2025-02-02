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
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user);
  }

  @UseGuards(AuthTokenGuard)
  @Get()
  asyncfindAll() {
    console.log('findAll');
    return this.userService.findAll();
  }

  @UseGuards(AuthTokenGuard)
  @Get(':id')
  find(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @UseGuards(AuthTokenGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
