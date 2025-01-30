import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() transaction: CreateTransactionDto) {
    return this.transactionService.create(transaction);
  }

  @Get()
  async findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() transaction: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, transaction);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
