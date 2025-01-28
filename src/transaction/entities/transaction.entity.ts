import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TRANSACTION_TYPE } from '../enums/transaction_type.enum';
import { TRANSACTION_PERIOD } from '../enums/transaction_period.enum';
import { TRANSACTION_SITUATION } from '../enums/transaction_situation.enum';
import { TRANSACTION_METOD } from '../enums/transaction_metod.enum';
import { Card } from 'src/card/entities/card.entity';
import { BankAccount } from 'src/bankAccount/entities/bankAccount.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  identification: string;

  @Column()
  date?: Date;

  @Column({ type: 'float', nullable: true })
  value: number;

  @Column()
  period_qty: number;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TRANSACTION_TYPE, nullable: true })
  type: TRANSACTION_TYPE;

  @Column({ type: 'enum', enum: TRANSACTION_PERIOD, nullable: true })
  period: TRANSACTION_PERIOD;

  @Column({ type: 'enum', enum: TRANSACTION_SITUATION, nullable: true })
  situation: TRANSACTION_SITUATION;

  @Column({ type: 'enum', enum: TRANSACTION_METOD, nullable: true })
  metod: TRANSACTION_METOD;

  @ManyToOne(
    () => Transaction,
    (transaction) => transaction.childTransactions,
    {
      onDelete: 'SET NULL',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'transaction_id' })
  parentTransaction?: Transaction;

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.parentTransaction,
    {
      cascade: true,
    },
  )
  childTransactions?: Transaction[];

  @ManyToOne(() => Card, (card) => card.transactions, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'card_id' })
  card?: Card;

  @ManyToOne(
    () => BankAccount,
    (bankAccount) => bankAccount.sourceTransactions,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'source_bank_account_id' })
  sourceBankAccount?: BankAccount;

  @ManyToOne(
    () => BankAccount,
    (bankAccount) => bankAccount.destinationTransactions,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'destination_bank_account_id' })
  destinationBankAccount?: BankAccount;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
