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
import { CARD_TYPE } from '../enums/card_type.type';
import { BankAccount } from 'src/bankAccount/entities/bankAccount.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  identification: string;

  @Column({ type: 'float', nullable: true })
  balance: number;

  @Column({ type: 'float', nullable: true })
  limit: number;

  @Column({ type: 'integer', nullable: true })
  due_date: number;

  @Column({ nullable: true })
  card_type: CARD_TYPE;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'bank_account_id' })
  bank_account_id: BankAccount;

  @ManyToOne(() => User, (user) => user.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @OneToMany(() => Transaction, (transaction) => transaction.card, {
    cascade: true,
  })
  transactions: Transaction[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  delete_at: Date;
}
