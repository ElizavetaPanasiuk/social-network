import { PostLikeDto } from '@/posts/dto';
import { PostLike } from '@/posts/entities';

export interface PostLikesRepository {
  create(dto: PostLikeDto): Promise<PostLike>;
  deleteOne(dto: PostLikeDto): Promise<number>;
}
