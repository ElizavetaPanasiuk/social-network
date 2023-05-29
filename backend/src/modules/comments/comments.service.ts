import { Injectable, Inject } from '@nestjs/common';

import { Repository } from '@/constants/repositories';

import { CreateCommentDto, UpdateCommentDto, CommentLikeDto } from './dto';
import { CommentLikesRepository } from './repositories/comment-likes/comment-likes.repository.interface';
import { CommentsRepository } from './repositories/comments/comments.repository.interface';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(Repository.Comments)
    private commentsRepository: CommentsRepository,
    @Inject(Repository.CommentLikes)
    private commentLikesRepository: CommentLikesRepository,
  ) {}

  getComments(postId: number, userId: number) {
    return this.commentsRepository.getPostComments(postId, userId);
  }

  getCommentById(commentId: number, userId: number) {
    return this.commentsRepository.getById(commentId, userId);
  }

  async createComment(dto: CreateCommentDto) {
    const comment = await this.commentsRepository.create(dto);
    return this.getCommentById(comment.id, dto.userId);
  }

  updateComment(id: number, dto: UpdateCommentDto) {
    return this.commentsRepository.updateOne(id, dto);
  }

  deleteComment(id: number) {
    return this.commentsRepository.deleteOne(id);
  }

  likeComment(dto: CommentLikeDto) {
    return this.commentLikesRepository.create(dto);
  }

  dislikeComment(dto: CommentLikeDto) {
    return this.commentLikesRepository.deleteOne(dto);
  }
}
