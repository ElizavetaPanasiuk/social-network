import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Comment } from './comment.model';
import { CommentLike } from './comment-like';
import { Post } from '../posts/post.model';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [SequelizeModule.forFeature([Comment, User, CommentLike, Post])],
})
export class CommentsModule {}
