import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './subscription.model';
import { User } from '../users/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  imports: [SequelizeModule.forFeature([Subscription, User])],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
