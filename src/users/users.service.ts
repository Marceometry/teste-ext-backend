import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CommentsService } from '@/comments/comments.service';
import { PostsService } from '@/posts/posts.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private postsService: PostsService,
    private commentsService: CommentsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['posts', 'comments'],
    });
    user.comments.forEach((comment) =>
      this.commentsService.remove(comment.id, 'comment_owner'),
    );
    user.posts.forEach((post) => {
      this.postsService.remove(post.id);
    });
    return this.usersRepository.softDelete(id);
  }
}
