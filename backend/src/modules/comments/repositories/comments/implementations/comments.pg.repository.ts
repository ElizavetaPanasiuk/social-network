import { Repository } from 'sequelize-typescript';
import { CommentsRepository } from '../comments.repository.interface';
import { Comment } from 'src/modules/comments/models/comment.model';
import { Sequelize } from 'sequelize';
import { User } from 'src/modules/users/models/user.model';
import { CreateCommentDto } from 'src/modules/comments/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/modules/comments/dto/update-comment.dto';

export class CommentsPgRepository implements CommentsRepository {
  constructor(private commentsRepository: Repository<Comment>) {}
  getPostComments(postId: number, userId: number) {
    return this.commentsRepository.findAll({
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
      order: [['createdAt', 'DESC']],
    });
  }

  getById(commentId: number, userId: number) {
    return this.commentsRepository.findByPk(commentId, {
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

  create(dto: CreateCommentDto) {
    return this.commentsRepository.create(dto);
  }

  updateOne(id: number, dto: UpdateCommentDto) {
    return this.commentsRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
  }

  deleteOne(id: number) {
    return this.commentsRepository.destroy({
      where: {
        id,
      },
    });
  }
}
