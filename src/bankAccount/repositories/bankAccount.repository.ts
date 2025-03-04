import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from '../entities/bankAccount.entity';
import { REGISTRATION_TYPE } from 'src/group/enums/registration_type.enum';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BankAccountRepository {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
  ) {}

  async create(bankAccount: CreateBankAccountDto) {
    return await this.bankAccountRepository.save(bankAccount);
  }

  async findAll(loggedUserId: string, type: REGISTRATION_TYPE) {
    return await this.bankAccountRepository
      .createQueryBuilder('bank_account')
      .leftJoinAndSelect('bank_account.cards', 'cards')
      .leftJoin('bank_account.user', 'owner')
      .addSelect(['owner.id', 'owner.name'])
      .leftJoin(
        'group_registration',
        'gr',
        'gr.registration = bank_account.id AND gr.type = :type',
        { type },
      )
      .leftJoin('group_user', 'gu', 'gu.group = gr.group')
      .where('bank_account.user = :userId', { userId: loggedUserId })
      .orWhere('gu.user = :userId', { userId: loggedUserId })
      .getMany();
  }

  async findById(id: string) {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { id },
      relations: ['cards', 'user'],
    });

    if (!bankAccount) {
      return null;
    }

    return {
      ...bankAccount,
      user: bankAccount.user
        ? ({ id: bankAccount.user.id, name: bankAccount.user.name } as User)
        : null,
    };
  }

  async update(id: string, data: Partial<BankAccount>) {
    await this.bankAccountRepository.update({ id }, data);
    const updatedBankAccount = await this.bankAccountRepository.findOneBy({
      id,
    });
    if (!updatedBankAccount) {
      throw new Error('Conta Bancária não encontrado');
    }
    return updatedBankAccount;
  }

  async delete(id: string) {
    const bankAccount = await this.findById(id);
    if (!bankAccount) {
      throw new NotFoundException('Conta bancária não encontrada!');
    }

    await this.bankAccountRepository.remove(bankAccount);
  }
}
