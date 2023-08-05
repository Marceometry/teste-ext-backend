import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { User } from '@/users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  views: number;

  @Column()
  likes: number;

  @Column()
  dislikes: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'id',
  })
  user: User;

  @ManyToMany(() => User)
  @JoinTable()
  likedByUsers: User[];

  @ManyToMany(() => User)
  @JoinTable()
  dislikedByUsers: User[];
}
