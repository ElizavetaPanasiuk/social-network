import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { User } from '../users/user.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostLikeDto } from './dto/create-like.dto';
import { PostLike } from './post-like.model';
import { Comment } from 'src/comments/comment.model';
import { Sequelize } from 'sequelize-typescript';

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
      attributes: [
        'id',
        'text',
        'createdAt',
        'authorId',
        [Sequelize.fn('COUNT', Sequelize.col('likes')), 'likesCount'],
        [Sequelize.fn('COUNT', Sequelize.col('comments')), 'commentsCount'],
      ],
      include: [
        {
          model: User,
          as: 'likes',
          attributes: [],
        },
        {
          model: User,
          as: 'author',
          attributes: ['firstName', 'lastName', 'avatar'],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: [],
        },
      ],
      group: [
        'Post.id',
        'likes.id',
        'likes.PostLike.id',
        'author.id',
        'comments.id',
      ],
      order: [['createdAt', 'DESC']],
    });
    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findByPk(id, {
      attributes: [
        'id',
        'text',
        'createdAt',
        'authorId',
        [Sequelize.fn('COUNT', Sequelize.col('likes')), 'likesCount'],
        [Sequelize.fn('COUNT', Sequelize.col('comments')), 'commentsCount'],
      ],
      include: [
        {
          model: User,
          as: 'likes',
          attributes: [],
        },
        {
          model: User,
          as: 'author',
          attributes: ['firstName', 'lastName', 'avatar'],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: [],
        },
      ],
      group: [
        'Post.id',
        'likes.id',
        'likes.PostLike.id',
        'author.id',
        'comments.id',
      ],
    });
    return post;
  }

  async createPost(dto: CreatePostDto) {
    const post = await this.postRepository.create(dto);
    return await this.getPostById(post.id);
  }

  async updatePost(id: number, dto: UpdatePostDto) {
    return await this.postRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
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

  async dislikePost(dto: CreatePostLikeDto) {
    return await this.postLikeRepository.destroy({
      where: {
        userId: dto.userId,
        postId: dto.postId,
      },
    });
  }
}
