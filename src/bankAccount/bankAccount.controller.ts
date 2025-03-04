import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { BankAccountService } from './bankAccount.service';
import { UpdateBankAccountDto } from './dto/update-bank-account';

import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';

@UseGuards(AuthTokenGuard)
@Controller('bankAccount')
export class BankAccountController {
  constructor(private bankAccountService: BankAccountService) {}

  @Post()
  async create(
    @Body() createBankAccountDto: CreateBankAccountDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.bankAccountService.create(
      createBankAccountDto,
      tokenPayload.sub,
    );
  }

  @Get()
  async findAll(@TokenPayloadParam() tokenPayload: TokenPayloadDto) {
    return this.bankAccountService.findAll(tokenPayload.sub);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.bankAccountService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() bankAccount: UpdateBankAccountDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.bankAccountService.update(id, bankAccount, tokenPayload.sub);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.bankAccountService.remove(id, tokenPayload.sub);
  }
}
