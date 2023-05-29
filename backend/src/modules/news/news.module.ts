import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Post } from '@/posts/models';
import { SubscriptionsModule } from '@/subscriptions/subscriptions.module';

import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [SequelizeModule.forFeature([Post]), SubscriptionsModule],
})
export class NewsModule {}
