import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postsRepository.save(createPostDto);
  }

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return this.postsRepository.findOne({ where: { id }, relations: ['user'] });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postsRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postsRepository.delete(id);
  }

  addView(id: number) {
    this.postsRepository
      .createQueryBuilder()
      .update(Post)
      .set({ views: () => 'views + 1' })
      .where('id = :id', { id })
      .execute();
  }

  async manageLike(postId: number, userId: number, add: boolean) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['likedByUsers', 'dislikedByUsers'],
    });
    if (!post) return null;

    if (add) {
      const userLikedPost = post.likedByUsers.some(
        (user) => user.id === userId,
      );
      if (userLikedPost) return null;

      const userDislikedPost = post.dislikedByUsers.some(
        (user) => user.id === userId,
      );
      if (userDislikedPost) {
        post.dislikedByUsers = post.dislikedByUsers.filter(
          (user) => user.id !== userId,
        );
        post.dislikes = post.dislikedByUsers.length;
      }

      const user = new User();
      user.id = userId;
      post.likedByUsers.push(user);
      post.likes = post.likedByUsers.length;
    } else {
      post.likedByUsers = post.likedByUsers.filter(
        (user) => user.id !== userId,
      );
      post.likes = post.likedByUsers.length;
    }

    await this.postsRepository.save(post);
    return post;
  }

  async manageDislike(postId: number, userId: number, add: boolean) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['dislikedByUsers', 'likedByUsers'],
    });
    if (!post) return null;

    if (add) {
      const userDislikedPost = post.dislikedByUsers.some(
        (user) => user.id === userId,
      );
      if (userDislikedPost) return null;

      const userLikedPost = post.likedByUsers.some(
        (user) => user.id === userId,
      );
      if (userLikedPost) {
        post.likedByUsers = post.likedByUsers.filter(
          (user) => user.id !== userId,
        );
        post.likes = post.likedByUsers.length;
      }

      const user = new User();
      user.id = userId;
      post.dislikedByUsers.push(user);
      post.dislikes = post.dislikedByUsers.length;
    } else {
      post.dislikedByUsers = post.dislikedByUsers.filter(
        (user) => user.id !== userId,
      );
      post.dislikes = post.dislikedByUsers.length;
    }

    await this.postsRepository.save(post);
    return post;
  }
}
