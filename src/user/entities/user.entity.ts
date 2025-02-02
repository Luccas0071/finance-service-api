import { BankAccount } from 'src/bankAccount/entities/bankAccount.entity';
import { Card } from 'src/card/entities/card.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  remember_token: string;

  @Column({ nullable: true })
  email_verified_at: Date;

  @OneToMany(() => Card, (card) => card.user_id, { cascade: true })
  cards: Card[];

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.user_id, {
    cascade: true,
  })
  bankAccounts: BankAccount[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  delete_at: Date;
}
