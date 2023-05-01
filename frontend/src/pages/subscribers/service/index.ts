import { Service } from "@/service";

class SubscribersService extends Service {
  constructor() {
    super("subscriptions/subscribers");
  }

  async getSubscribers(id: number) {
    return await this.getById(id);
  }
}

export default SubscribersService;
