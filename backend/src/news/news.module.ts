import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../posts/post.model';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [SequelizeModule.forFeature([Post]), SubscriptionsModule],
})
export class NewsModule {}
