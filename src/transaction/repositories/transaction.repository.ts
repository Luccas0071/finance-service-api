import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(transaction: CreateTransactionDto) {
    return this.transactionRepository.save(transaction);
  }

  async findAll() {
    return await this.transactionRepository.find({
      relations: ['card', 'sourceBankAccount', 'destinationBankAccount'],
    });
  }

  async findById(id: string) {
    return this.transactionRepository.findOne({
      where: { id },
      relations: ['card', 'sourceBankAccount', 'destinationBankAccount'],
    });
  }

  async update(id: string, transaction: UpdateTransactionDto) {
    await this.transactionRepository.update({ id }, transaction);
    const updatedTransaction = await this.transactionRepository.findOneBy({
      id,
    });
    if (!updatedTransaction) {
      throw new Error('Trasação não encontrado');
    }
    return updatedTransaction;
  }

  async delete(id: string) {
    const transaction = await this.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transação não encontrada!');
    }

    await this.transactionRepository.remove(transaction);
  }
}
