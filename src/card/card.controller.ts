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
import { CreateCardDto } from './dto/create-card.dto';
import { CardService } from './card.service';
import { UpdateCardDto } from './dto/update-card';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@UseGuards(AuthTokenGuard)
@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  async create(
    @Body() card: CreateCardDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    const response = this.cardService.create(card, tokenPayload.sub);
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
