import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../entities/card.entity';
import { CreateCardDto } from '../dto/create-card.dto';

@Injectable()
export class CardRepository {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async create(card: CreateCardDto) {
    return this.cardRepository.save(card);
  }

  async findAll() {
    return await this.cardRepository.find();
  }

  async findById(id: string) {
    return this.cardRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, data: Partial<Card>): Promise<Card> {
    await this.cardRepository.update({ id }, data);
    const updatedCard = await this.cardRepository.findOneBy({ id });
    if (!updatedCard) {
      throw new Error('Cartão não encontrado');
    }
    return updatedCard;
  }

  async delete(id: string) {
    const card = await this.findById(id);
    if (!card) {
      throw new NotFoundException('Conta bancária não encontrada!');
    }

    await this.cardRepository.remove(card);
  }
}
