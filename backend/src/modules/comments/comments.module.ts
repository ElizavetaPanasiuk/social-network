import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Post } from '@/posts/models/post.model';
import { User } from '@/users/models/user.model';

import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { provideCommentsRepository } from './repositories/comments/comments.repository.provider';
import { provideCommentLikesRepository } from './repositories/comment-likes/comment-likes.repository.provider';
import { Comment, CommentLike } from './models';

@Module({
  providers: [
    CommentsService,
    ...provideCommentsRepository(),
    ...provideCommentLikesRepository(),
  ],
  controllers: [CommentsController],
  imports: [SequelizeModule.forFeature([Comment, User, CommentLike, Post])],
})
export class CommentsModule {}
