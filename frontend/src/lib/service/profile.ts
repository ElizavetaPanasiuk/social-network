import Service from './service';

class ProfileService extends Service {
  constructor() {
    super('users');
  }

  getProfile(id: number) {
    return this.getById(id);
  }

  searchUsers(
    searchParams: { search: string; country: string; city: string; page?: number } = {
      search: '',
      country: '',
      city: '',
      page: 1,
    },
  ) {
    if (!searchParams.page) {
      searchParams.page = 1;
    }
    return this.get(searchParams);
  }

  updateProfile(
    id: number,
    data: { firstName: string; lastName: string; country: string; city: string; dateOfBirth: Date },
  ) {
    return this.updateById(id, { ...data, dateOfBirth: data.dateOfBirth.toISOString() }, '/profile');
  }

  updatePassword(id: number, data: { password: string }) {
    return this.updateById(id, data, '/password');
  }

  updateAvatar(id: number, avatar: File) {
    const formData = new FormData();
    formData.append('avatar', avatar);
    return this.updateById(id, formData, '/avatar');
  }
}

export default ProfileService;
