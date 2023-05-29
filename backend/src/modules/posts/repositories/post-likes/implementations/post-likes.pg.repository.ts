import { Repository } from 'sequelize-typescript';

import { PostLike } from '@/posts/models';
import { PostLikeDto } from '@/posts/dto';
import { PostLikesRepository } from '../post-likes.repository.interface';

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
