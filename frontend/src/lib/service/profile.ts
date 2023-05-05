import Service from './service';

class ProfileService extends Service {
  constructor() {
    super('users');
  }

  getProfile(id: number) {
    return this.getById(id);
  }

  // TODO: add default values
  searchUsers(searchParams: { search: string; country: string; city: string; page: number }) {
    return this.get(searchParams);
  }
}

export default ProfileService;
