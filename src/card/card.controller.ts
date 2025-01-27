import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardService } from './card.service';
import { UpdateCardDto } from './dto/update-card';

@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  async create(@Body() card: CreateCardDto) {
    const response = this.cardService.create(card);
    return response;
  }

  @Get()
  async findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.cardService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() card: UpdateCardDto) {
    return this.cardService.update(id, card);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cardService.remove(id);
  }
}
