import { CommentLikeDto } from '@/comments/dto';
import { CommentLike } from '@/comments/entities';

export interface CommentLikesRepository {
  create(dto: CommentLikeDto): Promise<CommentLike>;
  deleteOne(dto: CommentLikeDto): Promise<number>;
}
