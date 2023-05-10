import Service from './service';

class SubscriptionsService extends Service {
  constructor() {
    super('subscriptions');
  }

  async getSubscribers(id: number) {
    return await this.getById(id, '/subscribers');
  }

  async getSubscriptions(id: number) {
    return await this.getById(id);
  }

  async subscribe(subscriberId: number, profileId: number) {
    return await this.post({ subscriberId, profileId });
  }

  async unsubsribe(subscriberId: number, profileId: number) {
    return await this.remove({ subscriberId, profileId });
  }
}

export default SubscriptionsService;
