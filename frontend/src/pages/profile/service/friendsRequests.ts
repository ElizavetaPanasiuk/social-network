import Service from "@/service";

class FriendRequestsService extends Service {
  constructor() {
    super("friend-requests");
  }

  async createRequest(requestorId: number, requesteeId: number) {
    return await this.post({ requesteeId, requestorId });
  }
}

export default FriendRequestsService;
