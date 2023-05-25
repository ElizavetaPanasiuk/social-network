import { Repository } from 'sequelize-typescript';
import { SubscriptionsRepository } from '../subscriptions.repository.interface';
import { Subscription } from '../../models/subscription.model';
import { CreateSubscriptionDto } from '../../dto/create-subscription.dto';
import { User } from 'src/modules/users/models/user.model';

export class SubscriptionsPgRepository implements SubscriptionsRepository {
  constructor(private subscriptionsRepository: Repository<Subscription>) {}

  getUserSubscriptions(userId: number) {
    return this.subscriptionsRepository.findAll({
      where: {
        subscriberId: userId,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: User,
        as: 'profile',
        attributes: ['id', 'firstName', 'lastName', 'avatar'],
      },
    });
  }

  getUserSubscriptionsIds(userId: number) {
    return this.subscriptionsRepository
      .findAll({
        where: {
          subscriberId: userId,
        },
        attributes: ['profileId'],
      })
      .then((subscriptions) => subscriptions.map((el) => el.profileId));
  }

  getUserSubscribers(userId: number) {
    return this.subscriptionsRepository.findAll({
      where: {
        profileId: userId,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: User,
        as: 'subscriber',
        attributes: ['id', 'firstName', 'lastName', 'avatar'],
      },
    });
  }

  getSubscription(subscriberId: number, profileId: number) {
    return this.subscriptionsRepository.findOne({
      where: {
        profileId,
        subscriberId,
      },
    });
  }

  create(dto: CreateSubscriptionDto) {
    return this.subscriptionsRepository.create(dto);
  }

  deleteOne(dto: CreateSubscriptionDto) {
    return this.subscriptionsRepository.destroy({
      where: {
        profileId: dto.profileId,
        subscriberId: dto.subscriberId,
      },
    });
  }
}
