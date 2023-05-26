import Service from './service';

class ProfileService extends Service {
  constructor() {
    super('users');
  }

  getProfile(id: number) {
    return this.getById(id);
  }

  // TODO: add default values
  searchUsers(searchParams: { search: string; country: string; city: string; page?: number }) {
    if (!searchParams.page) {
      searchParams.page = 1;
    }
    return this.get(searchParams);
  }

  updateProfile(
    id: number,
    data: { firstName: string; lastName: string; country: string; city: string; dateOfBirth: Date },
  ) {
    return this.updateById(id, { ...data, dateOfBirth: data.dateOfBirth.toISOString() }, '/common');
  }

  updatePassword(id: number, data: { password: string }) {
    return this.updateById(id, data, '/password');
  }
}

export default ProfileService;
