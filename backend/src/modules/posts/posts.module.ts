import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './models/post.model';
import { User } from '../users/models/user.model';
import { PostLike } from './models/post-like.model';
import { providePostsRepository } from './repositories/post/posts.repository.provider';
import { providePostLkesRepository } from './repositories/post-likes/post-likes.repository.provider';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    ...providePostsRepository(),
    ...providePostLkesRepository(),
  ],
  imports: [SequelizeModule.forFeature([Post, User, PostLike])],
})
export class PostModule {}
