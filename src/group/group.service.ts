import { BadRequestException, Inject } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { GroupRepository } from './repositories/group.repository';
import { UpdateGroupDto } from './dto/update-group';
import { InputAddUserGroup } from './dto/input-add-user-grupo.dto';

export class GroupService {
  constructor(
    @Inject(GroupRepository)
    private readonly groupRepository: GroupRepository,
  ) {}

  async create(
    createGroupDto: CreateGroupDto,
    loggedUserId: string,
  ): Promise<Group> {
    try {
      const group = {
        user_id: { id: String(loggedUserId) } as User,
        ...createGroupDto,
      };

      return this.groupRepository.create(group);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao criar grupo!');
    }
  }

  async findAll() {
    return this.groupRepository.findAll();
  }

  async findById(id: string) {
    const group = await this.groupRepository.findById(id);
    if (!group) {
      throw new Error('Grupo não encontrado!');
    }
    return group;
  }

  async update(id: string, group: UpdateGroupDto) {
    await this.findById(id);
    return this.groupRepository.update(id, group);
  }

  async remove(id: string) {
    await this.findById(id);
    return this.groupRepository.delete(id);
  }

  async addUserToGroup(input: InputAddUserGroup) {
    const { group_id, users } = input;

    users.map(async ({ user_id }) => {
      const userGroup = {
        group: group_id,
        user: user_id,
      };
      await this.groupRepository.addUserToGroup(userGroup);
    });

    return { message: 'Usuário Adicionado ao grupo com sucesso' };
  }

  async removeUserFromGroup(input: InputAddUserGroup) {
    const { group_id, users } = input;

    users.map(async ({ user_id }) => {
      await this.groupRepository.removeUserFromGroup(group_id, user_id);
    });

    return { message: 'Usuário removido do grupo com sucesso' };
  }
}
