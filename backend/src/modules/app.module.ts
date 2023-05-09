import * as path from 'path';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { FilesModule } from './files/files.module';
import { MessagesModule } from './messages/messages.module';
import { NewsModule } from './news/news.module';
import { PostModule } from './posts/posts.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { UsersModule } from './users/users.module';

import { Comment } from './comments/comment.model';
import { CommentLike } from './comments/comment-like.model';
import { Message } from './messages/message.model';
import { Post } from './posts/post.model';
import { PostLike } from './posts/post-like.model';
import { Room } from './messages/room.model';
import { Subscription } from './subscriptions/subscription.model';
import { User } from './users/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [
        Comment,
        User,
        Post,
        Subscription,
        CommentLike,
        PostLike,
        Message,
        Room,
      ],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    UsersModule,
    AuthModule,
    PostModule,
    FilesModule,
    SubscriptionsModule,
    CommentsModule,
    MessagesModule,
    NewsModule,
  ],
})
export class AppModule {}
