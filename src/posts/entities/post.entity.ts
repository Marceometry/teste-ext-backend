import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Comment } from '@/comments/entities/comment.entity';
import { User } from '@/users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column('json', { nullable: true })
  editHistory: { content: string; editedAt: Date }[];

  @DeleteDateColumn()
  deletedAt: Date;

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
    foreignKeyConstraintName: 'post_user_fk',
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => User)
  @JoinTable()
  likedByUsers: User[];

  @ManyToMany(() => User)
  @JoinTable()
  dislikedByUsers: User[];
}
