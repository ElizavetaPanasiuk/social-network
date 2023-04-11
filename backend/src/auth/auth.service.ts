import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string) {
    const user = await this.userService.getLoginData(email);
    if (!user) {
      throw new NotFoundException("User with this email doesn't exist");
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      access_token: await this.jwtService.signAsync(user, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
