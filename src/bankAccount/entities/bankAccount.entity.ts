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
import { ACCOUNT_TYPE } from '../enums/account_type.type';
import { HOLDER_TYPE } from '../enums/holder_type.type';
import { Card } from 'src/card/entities/card.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  identification: string;

  @Column({ type: 'float', nullable: true })
  balance: number;

  @Column({ type: 'enum', enum: ACCOUNT_TYPE, nullable: true })
  account_type: ACCOUNT_TYPE;

  @Column({ type: 'enum', enum: HOLDER_TYPE, nullable: true })
  holder_type: HOLDER_TYPE;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Card, (card) => card.bank_account_id, { cascade: true })
  cards: Card[];

  @ManyToOne(() => User, (user) => user.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.sourceBankAccount,
    { cascade: true },
  )
  sourceTransactions: Transaction;

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.destinationBankAccount,
    { cascade: true },
  )
  destinationTransactions: Transaction;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  delete_at: Date;
}
