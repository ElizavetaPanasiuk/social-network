import { Injectable, Inject } from '@nestjs/common';

import { Repository } from '@/lib/enums/repositories';

import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionsRepository } from './repositories/subscriptions.repository.interface';

@Injectable()
export class SubscriptionsService {
  constructor(
    @Inject(Repository.Subscriptions)
    private subscriptionsRepository: SubscriptionsRepository,
  ) {}
  getSubscriptions(userId: number) {
    return this.subscriptionsRepository.getUserSubscriptions(userId);
  }

  async getSubscriptionsIds(userId: number) {
    return this.subscriptionsRepository.getUserSubscriptionsIds(userId);
  }

  getSubscribers(userId: number) {
    return this.subscriptionsRepository.getUserSubscribers(userId);
  }

  async subscribe(dto: CreateSubscriptionDto) {
    const { subscriberId, profileId } = dto;
    if (subscriberId === profileId) {
      throw new Error("A user can't subscribe on himself");
    }
    const existingSubscription =
      await this.subscriptionsRepository.getSubscription(
        subscriberId,
        profileId,
      );
    if (existingSubscription) {
      throw new Error('Subscription already exists');
    }
    return this.subscriptionsRepository.create(dto);
  }

  unsubscribe(dto: CreateSubscriptionDto) {
    return this.subscriptionsRepository.deleteOne(dto);
  }
}
