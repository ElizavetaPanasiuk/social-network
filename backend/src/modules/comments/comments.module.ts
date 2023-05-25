import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { Comment } from './models/comment.model';
import { CommentLike } from './models/comment-like.model';
import { Post } from '../posts/models/post.model';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [SequelizeModule.forFeature([Comment, User, CommentLike, Post])],
})
export class CommentsModule {}
