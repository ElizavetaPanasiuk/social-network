import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './subscription.model';
import { User } from '../users/user.model';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription)
    private subsciptionRepository: typeof Subscription,
  ) {}
  async getSubscriptions(userId: number) {
    return await this.subsciptionRepository.findAll({
      where: {
        subscriberId: userId,
      },
      include: {
        model: User,
        as: 'profile',
        attributes: ['id', 'firstName', 'lastName', 'avatar'],
      },
    });
  }

  async getSubscriptionsIds(userId: number) {
    const subscriptions = await this.subsciptionRepository.findAll({
      where: {
        subscriberId: userId,
      },
      attributes: ['profileId'],
    });

    return subscriptions.map((subscription) => subscription.profileId);
  }

  async getSubscribers(userId: number) {
    return await this.subsciptionRepository.findAll({
      where: {
        profileId: userId,
      },
      include: {
        model: User,
        as: 'subscriber',
        attributes: ['id', 'firstName', 'lastName', 'avatar'],
      },
    });
  }

  async subscribe(dto: CreateSubscriptionDto) {
    const { subscriberId, profileId } = dto;
    if (subscriberId === profileId) {
      throw new HttpException(
        "A user can't subscribe on himself",
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const existingSubscription = await this.subsciptionRepository.findOne({
      where: {
        subscriberId,
        profileId,
      },
    });
    if (existingSubscription) {
      throw new HttpException(
        'Subscription already exists',
        HttpStatus.CONFLICT,
      );
    }
    return await this.subsciptionRepository.create(dto);
  }

  async unsubscribe(id: number) {
    return await this.subsciptionRepository.destroy({
      where: {
        id,
      },
    });
  }
}
