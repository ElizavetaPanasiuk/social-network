import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '@/users/models/user.model';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostLike } from './models';
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
