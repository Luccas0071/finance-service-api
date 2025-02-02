import { BadRequestException, Inject } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardRepository } from './repositories/card.repository';
import { UpdateCardDto } from './dto/update-card';
import { Card } from './entities/card.entity';
import { BankAccountRepository } from 'src/bankAccount/repositories/bankAccount.repository';
import { UserRepository } from 'src/user/repositories/user.repository';
import { User } from 'src/user/entities/user.entity';
// import { SqsPublisher } from 'src/clientServer/sqs/sqs.publisher';

export class CardService {
  constructor(
    @Inject(CardRepository)
    private readonly cardRepository: CardRepository,

    @Inject(BankAccountRepository)
    private readonly bankAccountRepository: BankAccountRepository,

    @Inject(UserRepository)
    private readonly userRepository: UserRepository,

    // @Inject(SqsPublisher)
    // private readonly sqsPublisher: SqsPublisher,
  ) {}

  async create(
    createCardDto: CreateCardDto,
    loggedUserId: string,
  ): Promise<Card> {
    try {
      // const message = {
      //   message: 'Cartão criado com sucesso!',
      // };
      // this.sqsPublisher.publishMessage(JSON.stringify(message));

      const card = {
        user_id: { id: String(loggedUserId) } as User,
        ...createCardDto,
      };

      return this.cardRepository.create(card);
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
