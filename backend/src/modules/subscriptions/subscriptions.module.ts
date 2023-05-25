import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './models/subscription.model';
import { User } from '../users/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { provideSubscriptionsRepository } from './repositories/subscriptions.repository.provider';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, ...provideSubscriptionsRepository()],
  imports: [SequelizeModule.forFeature([Subscription, User])],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
