import { Inject } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account';
import { BankAccountRepository } from './repositories/bankAccount.repository';
import { User } from 'src/user/entities/user.entity';
import { REGISTRATION_TYPE } from 'src/group/enums/registration_type.enum';
import { CustomError } from 'src/common/error/custom.error';

export class BankAccountService {
  constructor(
    @Inject(BankAccountRepository)
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async create(
    createBankAccountDto: CreateBankAccountDto,
    loggedUserId: string,
  ) {
    try {
      const bankAccount = {
        user: { id: String(loggedUserId) } as User,
        ...createBankAccountDto,
      } as CreateBankAccountDto;
      const result = await this.bankAccountRepository.create(bankAccount);
      console.log(result);
      return { success: true, status: 201, data: result };
    } catch (error) {
      throw new CustomError(
        [error.message || 'Erro ao incluir conta bancaria'],
        400,
        'NEW_BANK_ACCOUNT',
      );
    }
  }

  async findAll(loggedUserId: string) {
    const type = REGISTRATION_TYPE.BANK_ACCOUNT;
    return this.bankAccountRepository.findAll(loggedUserId, type);
  }

  async findById(id: string) {
    const bankAccount = await this.bankAccountRepository.findById(id);
    if (!bankAccount) {
      throw new Error('Conta bancaria não encontrado!');
    }
    return bankAccount;
  }

  async update(
    id: string,
    bankAccountDto: UpdateBankAccountDto,
    loggedUserId: string,
  ) {
    try {
      const result = await this.validateLoggedInUser(id, loggedUserId);
      if (result.inError) {
        return result.data.message;
      }
      return this.bankAccountRepository.update(id, bankAccountDto);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async remove(id: string, loggedUserId: string) {
    const result = await this.validateLoggedInUser(id, loggedUserId);
    if (result.inError) {
      return result.data.message;
    }
    return this.bankAccountRepository.delete(id);
  }

  async validateLoggedInUser(idBankAccount: string, loggedUserId: string) {
    const bankAccount =
      await this.bankAccountRepository.findById(idBankAccount);

    if (bankAccount.user.id != loggedUserId) {
      return {
        inError: true,
        data: {
          message: 'Usuário não tem permissão para alterar este registro',
          status: 400,
        },
      };
    }
  }
}
