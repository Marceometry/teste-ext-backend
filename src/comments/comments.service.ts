import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDeletionSource } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  create(postId: number, userId: number, createCommentDto: CreateCommentDto) {
    return this.commentsRepository.save({
      ...createCommentDto,
      postId,
      userId,
    });
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
}
