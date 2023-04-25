import Service from "@/service";

class FriendsService extends Service {
  constructor() {
    super("friend-requests");
  }

  async getFriends(id: number) {
    return await this.get(`/approved/${id}`);
  }

  async getIncomingRequests(id: number) {
    return await this.get(`/incoming/${id}`);
  }

  async getOutcomingRequests(id: number) {
    return await this.get(`/outcoming/${id}`);
  }

  async declineRequest(id: number) {
    return await this.updateById(id, {}, "/decline");
  }

  async approveRequest(id: number) {
    return await this.updateById(id, {}, "/approve");
  }

  async cancelRequest(id: number) {
    return await this.removeById(id, "/cancel");
  }
}

export default FriendsService;
