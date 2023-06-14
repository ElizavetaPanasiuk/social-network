import { Comment } from '@/comments/entities';
import { CreateCommentDto, UpdateCommentDto } from '@/comments/dto';

export interface CommentsRepository {
  getPostComments(postId: number, userId: number): Promise<Array<Comment>>;
  getById(commentId: number, userId: number): Promise<Comment>;
  create(dto: CreateCommentDto): Promise<Comment>;
  updateOne(
    id: number,
    dto: UpdateCommentDto,
  ): Promise<[affectedCount: number, affectedRows: Array<Comment>]>;
  deleteOne(id: number): Promise<number>;
}
