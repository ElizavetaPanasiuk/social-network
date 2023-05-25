import { Repository } from 'sequelize-typescript';
import { PostLikesRepository } from '../post-likes.repository.interface';
import { PostLike } from 'src/modules/posts/models/post-like.model';
import { PostLikeDto } from 'src/modules/posts/dto/post-like.dto';

export class PostLikesPgRepository implements PostLikesRepository {
  constructor(private postLikesRepository: Repository<PostLike>) {}

  create(dto: PostLikeDto) {
    return this.postLikesRepository.create(dto);
  }

  deleteOne(dto: PostLikeDto) {
    return this.postLikesRepository.destroy({
      where: {
        userId: dto.userId,
        postId: dto.postId,
      },
    });
  }
}
