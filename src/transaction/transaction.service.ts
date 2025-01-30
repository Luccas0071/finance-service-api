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
    return await this.transactionRepository.create(transaction);
  }

  async findAll() {
    return await this.transactionRepository.findAll();
  }

  async findOne(id: string) {
    return await this.transactionRepository.findById(id);
  }

  async update(id: string, transaction: UpdateTransactionDto) {
    return this.transactionRepository.update(id, transaction);
  }

  async remove(id: string) {
    return await this.transactionRepository.delete(id);
  }
}
