import { Injectable, Inject } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentLikeDto } from './dto/comment-like.dto';
import { CommentLikesRepository } from './repositories/comment-likes/comment-likes.repository.interface';
import { CommentsRepository } from './repositories/comments/comments.repository.interface';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('comments-repository')
    private commentsRepository: CommentsRepository,
    @Inject('comment-likes-repository')
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
