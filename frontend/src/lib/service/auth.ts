import { Profile } from '@/lib/global/types';

import Service from './service';

class AuthService extends Service {
  constructor() {
    super('auth');
  }

  signIn(email: string, password: string): Promise<{ access_token: string }> {
    return this.post({ email, password }, '/signIn');
  }

  signUp(
    userData: Pick<
      Profile<File>,
      'password' | 'email' | 'firstName' | 'lastName' | 'city' | 'country' | 'dateOfBirth' | 'avatar'
    >,
  ) {
    const formData = new FormData();
    formData.append('password', userData.password);
    formData.append('email', userData.email);
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('country', userData.country);
    formData.append('city', userData.city);
    formData.append('dateOfBirth', userData.dateOfBirth.toISOString());
    formData.append('avatar', userData.avatar);
    return this.post(formData, '/signUp');
  }
}

export default AuthService;
