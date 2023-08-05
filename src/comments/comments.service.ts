import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailingService } from '@/mailing/mailing.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDeletionSource } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private mailingService: MailingService,
  ) {}

  async create(
    postId: number,
    userId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentsRepository.save({
      ...createCommentDto,
      postId,
      userId,
    });
    this.notifyPostOwner(comment.id);
    return comment;
  }

  findOne(id: number) {
    return this.commentsRepository.findOne({
      where: { id },
      relations: ['user', 'post'],
    });
  }

  findByPost(postId: number) {
    return this.commentsRepository.find({
      where: { postId },
      relations: ['user'],
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentsRepository.update(id, updateCommentDto);
  }

  async remove(id: number, deletedBy: CommentDeletionSource) {
    await this.commentsRepository.softDelete({ id });
    return this.commentsRepository.update(id, { deletedBy });
  }

  async notifyPostOwner(commentId: number) {
    const comment = await this.commentsRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.post', 'post')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('post.user', 'postOwner')
      .where('comment.id = :id', { id: commentId })
      .getOne();
    const subject = 'Novo comentário no seu post';
    const text = `Olá, ${comment.post.user.name}!\nAlguém comentou no seu post "${comment.post.title}"\n\n${comment.user.name}: ${comment.description}`;
    this.mailingService.sendEmail(comment.post.user.email, subject, text);
  }
}
