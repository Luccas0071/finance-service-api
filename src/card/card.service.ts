import { BadRequestException, Inject } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardRepository } from './repositories/card.repository';
import { UpdateCardDto } from './dto/update-card';

export class CardService {
  constructor(
    @Inject(CardRepository)
    private readonly cardRepository: CardRepository,
  ) {}

  async create(card: CreateCardDto) {
    try {
      this.cardRepository.create(card);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Erro ao criar cartão!');
    }
  }

  async findAll() {
    return this.cardRepository.findAll();
  }

  async findById(id: string) {
    const card = await this.cardRepository.findById(id);
    if (!card) {
      throw new Error('Conta bancaria não encontrado!');
    }
    return card;
  }

  async update(id: string, card: UpdateCardDto) {
    await this.findById(id);
    return this.cardRepository.update(id, card);
  }

  async remove(id: string) {
    await this.findById(id);
    return this.cardRepository.delete(id);
  }
}
