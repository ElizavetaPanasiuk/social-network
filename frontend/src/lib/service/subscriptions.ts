import Service from './service';

class SubscriptionsService extends Service {
  constructor() {
    super('subscriptions');
  }

  getSubscribers(id: number) {
    return this.getById(id, '/subscribers');
  }

  getSubscriptions(id: number) {
    return this.getById(id);
  }

  subscribe(subscriberId: number, profileId: number) {
    return this.post({ subscriberId, profileId });
  }

  unsubsribe(subscriberId: number, profileId: number) {
    return this.remove({ subscriberId, profileId });
  }
}

export default SubscriptionsService;
