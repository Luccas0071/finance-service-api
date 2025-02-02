import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import { CardRepository } from './repositories/card.repository';
import { CARD_TYPE } from './enums/card_type.type';
import { BankAccount } from 'src/bankAccount/entities/bankAccount.entity';

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

  // Isso deve estar definido
  it('should be defined', () => {
    expect(cardService).toBeDefined();
    expect(cardRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a card', async () => {
      const mockBankAccount = {
        id: '333',
        identification: 'Test Bank Account',
        balance: 1000,
      } as BankAccount;

      const card = {
        identification: 'Identification',
        balance: 2350,
        limit: 5000,
        due_date: 5,
        card_type: CARD_TYPE.CREDIT,
        bank_account_id: mockBankAccount,
      };

      const newCard = {
        id: '123',
        identification: 'Identification',
        balance: 2350,
        limit: 5000,
        due_date: 5,
        card_type: CARD_TYPE.CREDIT,
        bank_account_id: mockBankAccount,
      };

      jest.spyOn(cardRepository, 'create').mockResolvedValue(card as any);
      jest.spyOn(cardRepository, 'create').mockReturnValue(newCard as any);

      const result = await cardService.create(card);
      expect(cardRepository.create).toHaveBeenCalledWith(card);
      expect(result).toEqual(newCard);
    });

    it('should throw an error when create a card', async () => {
      const bankAccount = {
        id: '333',
        identification: 'Test Bank Account',
        balance: 1000,
      } as BankAccount;

      const card = {
        identification: 'Identification',
        balance: 2350,
        limit: 5000,
        due_date: 5,
        card_type: CARD_TYPE.CREDIT,
        bank_account_id: bankAccount,
      };

      jest.spyOn(cardRepository, 'create').mockRejectedValue(new Error());

      await expect(cardService.create(card)).rejects.toThrow();
    });
  });
});
