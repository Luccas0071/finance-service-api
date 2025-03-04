import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../entities/group.entity';
import { CreateGroupDto } from '../dto/create-group.dto';
import { group_user } from '../entities/group-user.entity';
import { group_registration } from '../entities/group-registration.entity';

@Injectable()
export class GroupRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(group_user)
    private readonly groupUserRepository: Repository<group_user>,
    @InjectRepository(group_registration)
    private readonly groupRegistrationRepository: Repository<group_registration>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.dataSource.transaction(async (manager) => {
      const group = this.groupRepository.create({
        ...createGroupDto,
      });
      const savedGroup = await manager.save(group);

      const userGroup = this.groupUserRepository.create({
        user: { id: savedGroup.user.id },
        group: savedGroup,
        owner: true,
      });
      await manager.save(userGroup);

      return savedGroup;
    });
  }

  async findAll() {
    return await this.groupRepository.find();
  }

  async findById(id: string) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['groupUsers', 'groupUsers.user'],
    });

    if (!group) {
      throw new Error('Grupo não encontrado');
    }

    return {
      id: group.id,
      name: group.identification,
      users: group.groupUsers.map((gu) => ({
        id: gu.user.id,
        name: gu.user.name,
        owner: gu.owner,
      })),
    };
  }

  async update(id: string, data: Partial<Group>): Promise<Group> {
    await this.groupRepository.update({ id }, data);
    const updatedGroup = await this.groupRepository.findOneBy({ id });
    if (!updatedGroup) {
      throw new Error('Grupo não encontrado');
    }
    return updatedGroup;
  }

  async delete(id: string) {
    const group = await this.groupRepository.findOne({
      where: { id },
    });
    if (!group) {
      throw new NotFoundException('Grupo não encontrada!');
    }

    await this.groupRepository.remove(group);
  }

  async addUserToGroup(groupUser: any) {
    return this.groupUserRepository.save(groupUser);
  }

  async removeUserFromGroup(group_id: string, user_id: string) {
    const userGroup = await this.groupUserRepository.findOne({
      where: { group: { id: group_id }, user: { id: user_id } },
      relations: ['group', 'user'],
    });

    if (!userGroup) {
      throw new Error('Usuário não está vinculado a este grupo');
    }

    await this.groupUserRepository.remove(userGroup);

    return true;
  }

  async addRegistrationGroup(groupRegistration: any) {
    return this.groupRegistrationRepository.save(groupRegistration);
  }
}
