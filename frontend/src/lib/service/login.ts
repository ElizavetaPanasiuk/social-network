import Service from './service';

class LoginService extends Service {
  constructor() {
    super('auth/signIn');
  }

  signIn(email: string, password: string): Promise<{ access_token: string }> {
    return this.post({ email, password });
  }
}

export default LoginService;
