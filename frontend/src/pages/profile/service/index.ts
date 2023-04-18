import Service from '@/service';
import { ProfileData } from '../types';

class ProfileService extends Service {
  constructor() {
    super('users');
  }

  async getProfileData(id: number): Promise<ProfileData> {
    return await this.getById(id);
  }
}

export default ProfileService;
