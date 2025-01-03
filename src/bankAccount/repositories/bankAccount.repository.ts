import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IBankAccountRepository } from './bankAccount.interface';
import { BankAccount } from '../entities/bankAccount.entity';

@Injectable()
export class BankAccountRepository implements IBankAccountRepository {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
  ) {}

  async create(bankAccount: CreateBankAccountDto) {
    return this.bankAccountRepository.save(bankAccount);
  }

  async findAll() {
    return await this.bankAccountRepository.find({ relations: ['cards'] });
  }

  async findById(id: string) {
    return this.bankAccountRepository.findOne({
      where: { id },
      relations: ['cards'],
    });
  }

  //   async update(id: string, data: BankAccount): Promise<bank_accounts> {
  //     // return this.prisma.bank_accounts.update({
  //     //   where: { id },
  //     //   data,
  //     // });
  //   }

  async delete(id: string) {
    const bankAccount = await this.findById(id);
    if (!bankAccount) {
      throw new NotFoundException('Conta bancária não encontrada!');
    }

    await this.bankAccountRepository.remove(bankAccount);
  }
}
