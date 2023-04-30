import { Service } from "@/service";

class ProfileService extends Service {
  constructor() {
    super("users");
  }

  getProfile(id: number) {
    return this.getById(id);
  }
}

export default ProfileService;
