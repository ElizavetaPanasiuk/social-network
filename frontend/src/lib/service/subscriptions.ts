import Service from './service';

class SubscriptionsService extends Service {
  constructor() {
    super('subscriptions');
  }

  getSubscribers(userId: number) {
    return this.getById(userId, '/subscribers');
  }

  getSubscriptions(userId: number) {
    return this.getById(userId);
  }

  subscribe(subscriberId: number, profileId: number) {
    return this.post({ subscriberId, profileId });
  }

  unsubsribe(subscriberId: number, profileId: number) {
    return this.remove({ subscriberId, profileId });
  }
}

export default SubscriptionsService;
