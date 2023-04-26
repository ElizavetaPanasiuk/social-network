import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './subscription.model';

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
    });
  }

  async getSubscribers(userId: number) {
    return await this.subsciptionRepository.findAll({
      where: {
        profileId: userId,
      },
    });
  }

  async subscribe(dto: CreateSubscriptionDto) {
    const { subscriberId, profileId } = dto;
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
