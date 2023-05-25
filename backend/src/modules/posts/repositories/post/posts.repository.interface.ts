import { CreatePostDto } from '../../dto/create-post.dto';
import { UpdatePostDto } from '../../dto/update-post.dto';
import { Post } from '../../entities/post.entity';

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
