import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentLike } from './comment-like.model';
import { CommentLikeDto } from './dto/comment-like.dto';
import { User } from '../users/user.model';
import { Sequelize } from 'sequelize';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(CommentLike) private commentLikeRepository: typeof CommentLike,
  ) {}

  async getComments(postId: number, currentUserId: number) {
    return await this.commentRepository.findAll({
      where: {
        postId,
      },
      attributes: {
        include: [
          [
            Sequelize.literal(
              `(SELECT COUNT(*)::int 
              FROM "comment-likes" 
              WHERE "commentId" = "Comment"."id")`,
            ),
            'likes',
          ],
          [
            Sequelize.literal(`(
              SELECT
                CASE
                WHEN EXISTS(
                  SELECT 1
                  FROM "comment-likes"
                  WHERE
                    "commentId" = "Comment"."id"
                    AND
                    "userId" = ${currentUserId}
                )
                THEN TRUE
                ELSE FALSE
              END
            )`),
            'liked',
          ],
        ],
        exclude: ['updatedAt', 'postId'],
      },
      include: {
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'avatar'],
      },
      order: [['createdAt', 'DESC']],
    });
  }

  async getCommentById(commentId: number, userId: number) {
    return await this.commentRepository.findByPk(commentId, {
      attributes: {
        include: [
          [
            Sequelize.literal(
              `(SELECT COUNT(*)::int 
              FROM "comment-likes" 
              WHERE "commentId" = ${commentId})`,
            ),
            'likes',
          ],
          [
            Sequelize.literal(`(
              SELECT
                CASE
                WHEN EXISTS(
                  SELECT 1
                  FROM "comment-likes"
                  WHERE
                    "commentId" =  ${commentId}
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
        exclude: ['updatedAt', 'postId'],
      },
      include: {
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'avatar'],
      },
    });
  }

  async createComment(dto: CreateCommentDto) {
    const comment = await this.commentRepository.create(dto);
    return await this.getCommentById(comment.id, dto.userId);
  }

  async updateComment(id: number, dto: UpdateCommentDto) {
    return await this.commentRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
  }

  async deleteComment(id: number) {
    return await this.commentRepository.destroy({
      where: {
        id,
      },
    });
  }

  async likeComment(dto: CommentLikeDto) {
    return await this.commentLikeRepository.create(dto);
  }

  async dislikeComment(dto: CommentLikeDto) {
    return await this.commentLikeRepository.destroy({
      where: {
        userId: dto.userId,
        commentId: dto.commentId,
      },
    });
  }
}