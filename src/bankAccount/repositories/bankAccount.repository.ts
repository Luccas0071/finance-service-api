import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from '../entities/bankAccount.entity';

@Injectable()
export class BankAccountRepository {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
  ) {}

  async create(bankAccount: CreateBankAccountDto) {
    return await this.bankAccountRepository.save(bankAccount);
  }

  async findAll() {
    return await this.bankAccountRepository.find({ relations: ['cards'] });
  }

  async findById(id: string) {
    return await this.bankAccountRepository.findOne({
      where: { id },
      relations: ['cards'],
    });
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
