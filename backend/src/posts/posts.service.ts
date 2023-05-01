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
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)::int
                FROM "post-likes"
                WHERE "postId" = "Post"."id"
            )`),
            'likes',
          ],
          [
            Sequelize.literal(`(
              SELECT COUNT(*)::int
                FROM comments
                WHERE "postId" = "Post"."id"
            )`),
            'comments',
          ],
          [
            Sequelize.literal(`(
              SELECT 
                CASE 
                WHEN EXISTS(
                  SELECT 1 
                  FROM "post-likes" 
                  WHERE 
                    "postId" = "Post"."id"
                    AND
                    "userId" = ${userId}
                )
                THEN TRUE
                ELSE FALSE
              END
            )`),
            'liked',
          ],
        ],
        exclude: ['updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['firstName', 'lastName', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return posts;
  }

  async getPostById(id: number, userId: number) {
    const post = await this.postRepository.findByPk(id, {
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)::int
                FROM "post-likes"
                WHERE
                  "postId" = ${id}
            )`),
            'likes',
          ],
          [
            Sequelize.literal(`(
              SELECT COUNT(*)::int
                FROM comments
                WHERE
                  "postId" = ${id}
            )`),
            'comments',
          ],
          [
            Sequelize.literal(`(
              SELECT 
                CASE 
                WHEN EXISTS(
                  SELECT 1 
                  FROM "post-likes" 
                  WHERE 
                    "postId" = ${id}
                    AND
                    "userId" = ${userId}
                )
                THEN TRUE
                ELSE FALSE
              END
            )`),
            'liked',
          ],
        ],
        exclude: ['updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['firstName', 'lastName', 'avatar'],
        },
      ],
    });
    return post;
  }

  async createPost(dto: CreatePostDto) {
    const post = await this.postRepository.create(dto);
    return await this.getPostById(post.id, dto.authorId);
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
