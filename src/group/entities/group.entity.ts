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
import { User } from 'src/user/entities/user.entity';
import { group_user } from './group-user.entity';
import { group_registration } from './group-registration.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  identification: string;

  @ManyToOne(() => User, (user) => user.groups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToMany(() => group_user, (groupUser) => groupUser.group)
  groupUsers: group_user[];

  @OneToMany(
    () => group_registration,
    (groupRegistration) => groupRegistration.group,
  )
  groupRegistration: group_registration;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  delete_at: Date;
}
