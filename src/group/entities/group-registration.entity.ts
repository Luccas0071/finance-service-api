import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { REGISTRATION_TYPE } from '../enums/registration_type.enum';

@Entity()
export class group_registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Group, (group) => group.groupRegistration, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'group' })
  group: Group;

  @Column()
  registration: string;

  @Column({ type: 'enum', enum: REGISTRATION_TYPE, nullable: false })
  type: REGISTRATION_TYPE;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
