import { Repository } from 'sequelize-typescript';

import { CommentLikesRepository } from '../comment-likes.repository.interface';
import { CommentLike } from '@/comments/models';
import { CommentLikeDto } from '@/comments/dto';

export class CommentLikesPgRepository implements CommentLikesRepository {
  constructor(private commentLikesRepository: Repository<CommentLike>) {}
  create(dto: CommentLikeDto) {
    return this.commentLikesRepository.create(dto);
  }
  deleteOne(dto: CommentLikeDto) {
    return this.commentLikesRepository.destroy({
      where: {
        userId: dto.userId,
        commentId: dto.commentId,
      },
    });
  }
}
