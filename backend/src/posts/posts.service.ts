import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { User } from '../users/user.model';
import { CreatePostDto } from './create-post.dto';
import { UpdatePostDto } from './update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async getPostsByUserId(userId: number) {
    const posts = await this.postRepository.findAll({
      where: {
        authorId: userId,
      },
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
      order: [['createdAt', 'DESC']],
    });
    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findByPk(id, {
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
    });
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
}
