import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import { CardRepository } from './repositories/card.repository';

describe('CardService', () => {
  let cardService: CardService;
  let cardRepository: CardRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardService,
        {
          provide: CardRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    cardService = module.get<CardService>(CardService);
    cardRepository = module.get<CardRepository>(CardRepository);
  });

  it('should be defined', () => {
    expect(cardService).toBeDefined();
    expect(cardRepository).toBeDefined();
  });
});
