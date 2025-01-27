import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(user: CreateUserDto) {
    try {
      return await this.userRepository.create(user);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao criar usuário!');
    }
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async find(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado!');
    }
    return user;
  }

  async update(id: string, user: UpdateUserDto) {
    await this.find(id);
    return this.userRepository.update(id, user);
  }

  async remove(id: string) {
    await this.find(id);
    return this.userRepository.delete(id);
  }
}
