import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from '@/auth/auth.controller';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('post/:postId')
  create(
    @Request() req,
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(+postId, req.user.id, createCommentDto);
  }

  @Public()
  @Get('post/:postId')
  findByPost(@Param('postId') postId: string) {
    return this.commentsService.findByPost(+postId);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentsService.findOne(+id);
    if (req.user.id !== comment.user.id) throw new UnauthorizedException();
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const comment = await this.commentsService.findOne(+id);
    const userId = req.user.id;
    const isPostOwner = userId === comment.post.userId;
    if (userId !== comment.user.id && !isPostOwner) {
      throw new UnauthorizedException();
    }
    const deletedBy = isPostOwner ? 'post_owner' : 'comment_owner';
    return this.commentsService.remove(+id, deletedBy);
  }
}
