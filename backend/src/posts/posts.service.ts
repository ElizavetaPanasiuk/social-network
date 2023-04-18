import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { User } from '../users/user.model';
import { CreatePostDto } from './create-post.dto';

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
    });
    return posts;
  }

  async createPost(dto: CreatePostDto) {
    const post = await this.postRepository.create(dto);
    return post;
  }

  async removePost(id: number) {
    return this.postRepository.destroy({
      where: {
        id,
      },
    });
  }
}
