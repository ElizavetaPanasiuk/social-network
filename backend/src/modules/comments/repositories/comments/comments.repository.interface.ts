import { Comment } from '../../entities/comment.entity';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { UpdateCommentDto } from '../../dto/update-comment.dto';

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
