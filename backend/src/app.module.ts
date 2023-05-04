import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { CommentsModule } from './comments/comments.module';
import * as path from 'path';
import { Post } from './posts/post.model';
import { Subscription } from './subscriptions/subscription.model';
import { Comment } from './comments/comment.model';
import { CommentLike } from './comments/comment-like';
import { PostLike } from './posts/post-like.model';
import { MessagesModule } from './messages/messages.module';

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
      models: [Comment, User, Post, Subscription, CommentLike, PostLike],
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
  ],
})
export class AppModule {}
