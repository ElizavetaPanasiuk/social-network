import { Service } from '@/service';
import { RegistrationData } from '../types/registrationData';

class RegistrationService extends Service {
  constructor() {
    super('auth/signUp');
  }

  async signUp(userData: RegistrationData) {
    const formData = new FormData();
    formData.append('password', userData.password);
    formData.append('email', userData.email);
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('country', userData.country);
    formData.append('city', userData.city);
    formData.append('dateOfBirth', userData.dateOfBirth.toString());
    formData.append('avatar', userData.avatar as File);
    return await this.post(formData);
  }
}

export default RegistrationService;
