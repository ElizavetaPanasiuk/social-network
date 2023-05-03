import { Service } from '@/lib/service';

class ProfileService extends Service {
  constructor() {
    super('users');
  }

  getProfile(id: number) {
    return this.getById(id);
  }
}

export default ProfileService;
