import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostLikeDto } from './dto/post-like.dto';
import { PostsRepopository } from './repositories/post/posts.repository.interface';
import { PostLikesRepository } from './repositories/post-likes/post-likes.repository.interface';

const LIMIT = 10;

@Injectable()
export class PostsService {
  constructor(
    @Inject('posts-repository') private postsRepository: PostsRepopository,
    @Inject('post-likes-repository')
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
    // TODO: cascade delete with post-likes
    return this.postsRepository.deleteOne(id);
  }

  likePost(dto: PostLikeDto) {
    return this.postLikesRepository.create(dto);
  }

  dislikePost(dto: PostLikeDto) {
    return this.postLikesRepository.deleteOne(dto);
  }
}
