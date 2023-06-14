import { Injectable, Inject } from '@nestjs/common';

import { Repository } from '@/lib/enums/repositories';

import { CreatePostDto, UpdatePostDto, PostLikeDto } from './dto';
import { PostsRepository } from './repositories/post/posts.repository.interface';
import { PostLikesRepository } from './repositories/post-likes/post-likes.repository.interface';

const LIMIT = 10;

@Injectable()
export class PostsService {
  constructor(
    @Inject(Repository.Posts) private postsRepository: PostsRepository,
    @Inject(Repository.PostLikes)
    private postLikesRepository: PostLikesRepository,
  ) {}

  async getPostsByProfileId(profileId: number, userId: number, page: number) {
    const posts = await this.postsRepository.getManyByProfileId(
      profileId,
      userId,
      page,
      LIMIT,
    );
    return { isLast: posts.length < LIMIT, data: posts };
  }

  getPostById(id: number, userId: number) {
    return this.postsRepository.getById(id, userId);
  }

  async createPost(dto: CreatePostDto) {
    const post = await this.postsRepository.create(dto);
    return this.getPostById(post.id, dto.userId);
  }

  updatePost(id: number, dto: UpdatePostDto) {
    return this.postsRepository.updateOne(id, dto);
  }

  removePost(id: number) {
    return this.postsRepository.deleteOne(id);
  }

  likePost(dto: PostLikeDto) {
    return this.postLikesRepository.create(dto);
  }

  dislikePost(dto: PostLikeDto) {
    return this.postLikesRepository.deleteOne(dto);
  }
}
