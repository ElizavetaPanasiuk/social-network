import Service from "@/service";

class RegistrationService extends Service {
  constructor() {
    super("auth/signUp");
  }

  async signUp(userData: {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    dateOfBirth: Date;
  }) {
    return await this.post(userData);
  }
}

export default RegistrationService;
