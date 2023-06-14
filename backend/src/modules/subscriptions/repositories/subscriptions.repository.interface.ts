import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { Subscription } from '../entities/subscription.entity';

export interface SubscriptionsRepository {
  getUserSubscriptions(userId: number): Promise<Array<Subscription>>;
  getUserSubscriptionsIds(userId: number): Promise<Array<number>>;
  getUserSubscribers(userId: number): Promise<Array<Subscription>>;
  getSubscription(
    subscriberId: number,
    profileId: number,
  ): Promise<Subscription>;
  create(dto: CreateSubscriptionDto): Promise<Subscription>;
  deleteOne(dto: CreateSubscriptionDto): Promise<number>;
}
