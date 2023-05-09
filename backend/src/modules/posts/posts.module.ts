import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './post.model';
import { User } from '../users/user.model';
import { PostLike } from './post-like.model';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([Post, User, PostLike])],
})
export class PostModule {}
