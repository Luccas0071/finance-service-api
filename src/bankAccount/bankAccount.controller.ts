import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
// import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { BankAccountService } from './bankAccount.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyModel } from './my.model.interface';

@Controller('bankAccount')
export class BankAccountController {
  constructor(
    private bankAccountService: BankAccountService,
    @InjectModel('MyModel')
    private readonly myModel: Model<MyModel>,
  ) {}

  @Post()
  async create(@Body() data: any) {
    // console.log(createBankAccountDto);
    const createdData = new this.myModel(data);
    return await createdData.save();
    // const response = this.bankAccountService.create(createBankAccountDto);
    // return response;
  }

  @Get()
  findAll() {
    return this.bankAccountService.findAll();
  }

  // @Get(':id')
  // find(@Param('id') id: string) {
  //   return this.bankAccountService.find(id);
  // }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateBankAccountDto: UpdateBankAccountDto,
  // ) {
  //   return this.bankAccountService.update(id, updateBankAccountDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bankAccountService.remove(id);
  // }
}
