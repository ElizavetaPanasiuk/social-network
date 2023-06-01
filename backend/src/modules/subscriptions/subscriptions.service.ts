import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';

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
    return this.getSubscribers(userId);
  }

  async subscribe(dto: CreateSubscriptionDto) {
    const { subscriberId, profileId } = dto;
    if (subscriberId === profileId) {
      throw new HttpException(
        "A user can't subscribe on himself",
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const existingSubscription =
      await this.subscriptionsRepository.getSubscription(
        subscriberId,
        profileId,
      );
    if (existingSubscription) {
      throw new HttpException(
        'Subscription already exists',
        HttpStatus.CONFLICT,
      );
    }
    return this.subscriptionsRepository.create(dto);
  }

  unsubscribe(dto: CreateSubscriptionDto) {
    return this.subscriptionsRepository.deleteOne(dto);
  }
}
