import Service from './service';

class RegistrationService extends Service {
  constructor() {
    super('auth/signUp');
  }

  signUp(userData) {
    const formData = new FormData();
    formData.append('password', userData.password);
    formData.append('email', userData.email);
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('country', userData.country);
    formData.append('city', userData.city);
    formData.append('dateOfBirth', userData.dateOfBirth.toISOString());
    formData.append('avatar', userData.avatar as File);
    return this.post(formData);
  }
}

export default RegistrationService;
