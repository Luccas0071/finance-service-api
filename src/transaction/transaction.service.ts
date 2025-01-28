import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './repositories/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TransactionRepository)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async create(transaction: CreateTransactionDto) {
    console.log(transaction);
    await this.transactionRepository.create(transaction);
    return 'This action adds a new transaction';
  }

  async findAll() {
    return await this.transactionRepository.findAll();
  }

  findOne(id: string) {
    return `This action returns a #${id} transaction`;
  }

  update(id: string, transaction: UpdateTransactionDto) {
    console.log(transaction);
    return `This action updates a #${id} transaction`;
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
