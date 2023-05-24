import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { User } from '../users/models/user.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostLikeDto } from './dto/post-like.dto';
import { PostLike } from './post-like.model';
import { Sequelize } from 'sequelize-typescript';

const LIMIT = 10;

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    @InjectModel(PostLike) private postLikeRepository: typeof PostLike,
  ) {}

  async getPostsByProfileId(profileId: number, userId: number, page: number) {
    const posts = await this.postRepository.findAll({
      where: {
        userId: profileId,
      },
      limit: LIMIT,
      offset: LIMIT * (page - 1),
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
          as: 'user',
          attributes: ['firstName', 'lastName', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return { isLast: posts.length < LIMIT, data: posts };
  }

  getPostById(id: number, userId: number) {
    return this.postRepository.findByPk(id, {
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
          as: 'user',
          attributes: ['firstName', 'lastName', 'avatar'],
        },
      ],
    });
  }

  async createPost(dto: CreatePostDto) {
    const post = await this.postRepository.create(dto);
    return this.getPostById(post.id, dto.userId);
  }

  updatePost(id: number, dto: UpdatePostDto) {
    return this.postRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
  }

  removePost(id: number) {
    // TODO: cascade delete with post-likes
    return this.postRepository.destroy({
      where: {
        id,
      },
    });
  }

  likePost(dto: PostLikeDto) {
    return this.postLikeRepository.create(dto);
  }

  dislikePost(dto: PostLikeDto) {
    return this.postLikeRepository.destroy({
      where: {
        userId: dto.userId,
        postId: dto.postId,
      },
    });
  }
}
