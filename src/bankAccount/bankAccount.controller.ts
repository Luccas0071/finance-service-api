import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { BankAccountService } from './bankAccount.service';
import { UpdateBankAccountDto } from './dto/update-bank-account';

@Controller('bankAccount')
export class BankAccountController {
  constructor(private bankAccountService: BankAccountService) {}

  @Post()
  async create(@Body() createBankAccountDto: CreateBankAccountDto) {
    const response = this.bankAccountService.create(createBankAccountDto);
    return response;
  }

  @Get()
  async findAll() {
    return this.bankAccountService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.bankAccountService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() bankAccount: UpdateBankAccountDto,
  ) {
    return this.bankAccountService.update(id, bankAccount);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bankAccountService.remove(id);
  }
}
