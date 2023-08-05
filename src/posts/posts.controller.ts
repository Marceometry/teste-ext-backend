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
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    const userId = req.user.sub;
    return this.postsService.create({ ...createPostDto, userId });
  }

  @Public()
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const post = await this.postsService.findOne(+id);
    if (req.user?.sub !== post.userId) {
      this.postsService.addView(post.id);
    }
    return post;
  }

  @Patch(':id/like')
  like(@Request() req, @Param('id') id: string) {
    return this.postsService.manageLike(+id, req.user.sub, true);
  }

  @Patch(':id/like/remove')
  removeLike(@Request() req, @Param('id') id: string) {
    return this.postsService.manageLike(+id, req.user.sub, false);
  }

  @Patch(':id/dislike')
  dislike(@Request() req, @Param('id') id: string) {
    return this.postsService.manageDislike(+id, req.user.sub, true);
  }

  @Patch(':id/dislike/remove')
  removeDislike(@Request() req, @Param('id') id: string) {
    return this.postsService.manageDislike(+id, req.user.sub, false);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postsService.findOne(+id);
    if (req.user.sub !== post.user.id) throw new UnauthorizedException();
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const post = await this.postsService.findOne(+id);
    if (req.user.sub !== post.user.id) throw new UnauthorizedException();
    return this.postsService.remove(+id);
  }
}
