import { BadRequestException, Inject } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { IBankAccountRepository } from './repositories/bankAccount.interface';
import { I_BANK_ACCOUNT_REPOSITORY } from '../common/constant';
// import { UpdateBankAccountDto } from './dto/update-bank-account';

export class BankAccountService {
  constructor(
    @Inject(I_BANK_ACCOUNT_REPOSITORY)
    private readonly bankAccountRepository: IBankAccountRepository,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    try {
      this.bankAccountRepository.create(createBankAccountDto);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao criar conta bancária!');
    }
    return {
      status: 201,
      message: 'Conta bancária cadastrada com sucesso !',
    };
  }

  async findAll() {
    return this.bankAccountRepository.findAll();
  }

  // async find(id: string) {
  //   const bankAccount = await this.bankAccountRepository.findById(id);
  //   if (!bankAccount) {
  //     throw new Error('Conta bancaria não encontrado!');
  //   }
  //   return bankAccount;
  // }

  // async update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
  //   await this.find(id);
  //   return this.bankAccountRepository.update(id, updateBankAccountDto);
  // }

  // async remove(id: string) {
  //   await this.find(id);
  //   return this.bankAccountRepository.delete(id);
  // }
}
