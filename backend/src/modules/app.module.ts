import * as path from 'path';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule } from '@/auth/auth.module';
import { CommentsModule } from '@/comments/comments.module';
import { CryptoModule } from '@/crypto/crypto.module';
import { FilesModule } from '@/files/files.module';
import { HashModule } from '@/hash/hash.module';
import { MessagesModule } from '@/messages/messages.module';
import { NewsModule } from '@/news/news.module';
import { PostModule } from '@/posts/posts.module';
import { SubscriptionsModule } from '@/subscriptions/subscriptions.module';
import { UsersModule } from '@/users/users.module';

import { Comment, CommentLike } from '@/comments/models';
import { Message, Room } from '@/messages/models';
import { PostLike, Post } from '@/posts/models';
import { Subscription } from '@/subscriptions/models/subscription.model';
import { User } from '@/users/models/user.model';

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
      uri: process.env.PG_URL,
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
      rootPath: path.resolve(__dirname, '../..', 'static'),
    }),
    CryptoModule,
    UsersModule,
    AuthModule,
    PostModule,
    FilesModule,
    SubscriptionsModule,
    CommentsModule,
    MessagesModule,
    NewsModule,
    HashModule,
  ],
})
export class AppModule {}
