import { BadRequestException, Inject } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account';
import { BankAccountRepository } from './repositories/bankAccount.repository';

export class BankAccountService {
  constructor(
    @Inject(BankAccountRepository)
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    try {
      this.bankAccountRepository.create(createBankAccountDto);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao criar conta bancária!');
    }
  }

  async findAll() {
    return this.bankAccountRepository.findAll();
  }

  async findById(id: string) {
    const bankAccount = await this.bankAccountRepository.findById(id);
    if (!bankAccount) {
      throw new Error('Conta bancaria não encontrado!');
    }
    return bankAccount;
  }

  async update(id: string, bankAccount: UpdateBankAccountDto) {
    return this.bankAccountRepository.update(id, bankAccount);
  }

  async remove(id: string) {
    await this.findById(id);
    return this.bankAccountRepository.delete(id);
  }
}
