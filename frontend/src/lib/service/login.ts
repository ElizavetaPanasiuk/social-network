import { Service } from '.';

class LoginService extends Service {
  constructor() {
    super('auth/signIn');
  }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    return await this.post({ email, password });
  }
}

export default LoginService;
