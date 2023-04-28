import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { User } from '../users/user.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostLikeDto } from './dto/create-like.dto';
import { PostLike } from './post-like.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    @InjectModel(PostLike) private postLikeRepository: typeof PostLike,
  ) {}

  async getPostsByUserId(userId: number) {
    const posts = await this.postRepository.findAll({
      where: {
        authorId: userId,
      },
      include: {
        model: User,
        as: 'likes',
        attributes: ['id', 'firstName', 'lastName', 'avatar'],
      },
      order: [['createdAt', 'DESC']],
    });
    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findByPk(id);
    return post;
  }

  async createPost(dto: CreatePostDto) {
    const post = await this.postRepository.create(dto);
    return await this.getPostById(post.id);
  }

  async updatePost(id: number, dto: UpdatePostDto) {
    await this.postRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return await this.getPostById(id);
  }

  async removePost(id: number) {
    return this.postRepository.destroy({
      where: {
        id,
      },
    });
  }

  async likePost(dto: CreatePostLikeDto) {
    return await this.postLikeRepository.create(dto);
  }

  async dislikePost(id: number) {
    return await this.postLikeRepository.destroy({
      where: {
        id,
      },
    });
  }
}
