import { PostLikeDto } from '../../dto/post-like.dto';
import { PostLike } from '../../entities/postLike.enity';

export interface PostLikesRepository {
  create(dto: PostLikeDto): Promise<PostLike>;
  deleteOne(dto: PostLikeDto): Promise<number>;
}
