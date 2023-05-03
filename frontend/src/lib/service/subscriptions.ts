import { Service } from '@/lib/service';

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
}

export default SubscriptionsService;
