import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Post } from '@/posts/entities/post.entity';
import { User } from '@/users/entities/user.entity';

export type CommentDeletionSource = 'post_owner' | 'comment_owner';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  deletedBy: CommentDeletionSource;

  @Column()
  postId: number;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({
    name: 'postId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'comment_post_fk',
  })
  post: Post;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'comment_user_fk',
  })
  user: User;
}
