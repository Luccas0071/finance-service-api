import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Group } from './group.entity';

@Entity()
export class group_user {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Group, (group) => group.groupUsers, { onDelete: 'CASCADE' })
  group: Group;

  @ManyToOne(() => User, (user) => user.groupUsers, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
