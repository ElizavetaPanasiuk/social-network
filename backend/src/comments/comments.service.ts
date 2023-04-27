import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentLike } from './comment-like';
import { CreateCommentLikeDto } from './dto/create-like.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(CommentLike) private commentLikeRepository: typeof CommentLike,
  ) {}

  async getComments(postId: number) {
    return await this.commentRepository.findAll({
      where: {
        postId,
      },
    });
  }

  async createComment(dto: CreateCommentDto) {
    return await this.commentRepository.create(dto);
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

  async likeComment(dto: CreateCommentLikeDto) {
    return await this.commentLikeRepository.create(dto);
  }

  //TODO: change on removing by id
  async dislikeCommnet(dto: CreateCommentLikeDto) {
    const { userId, commentId } = dto;

    return await this.commentLikeRepository.destroy({
      where: {
        userId,
        commentId,
      },
    });
  }
}
