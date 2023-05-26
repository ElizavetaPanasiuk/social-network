import { CommentLikeDto } from '../../dto/comment-like.dto';
import { CommentLike } from '../../entities/comment-like.entity';

export interface CommentLikesRepository {
  create(dto: CommentLikeDto): Promise<CommentLike>;
  deleteOne(dto: CommentLikeDto): Promise<number>;
}
