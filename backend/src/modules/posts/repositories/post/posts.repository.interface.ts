import { CreatePostDto, UpdatePostDto } from '@/posts/dto';
import { Post } from '@/posts/entities';

export interface PostsRepository {
  getManyByProfileId(
    profileId: number,
    userId: number,
    page: number,
    limit: number,
  ): Promise<Array<Post>>;
  getById(id: number, userId: number): Promise<Post>;
  create(dto: CreatePostDto): Promise<Post>;
  updateOne(
    id: number,
    dto: UpdatePostDto,
  ): Promise<[affectedCount: number, affectedRows: Array<Post>]>;
  deleteOne(id: number): Promise<number>;
}
