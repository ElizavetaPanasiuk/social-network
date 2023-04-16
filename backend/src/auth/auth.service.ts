import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/create-user.dto';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.getLoginData(email);
    if (!user) {
      throw new NotFoundException("User with this email doesn't exist");
    }
    const isMatch = await this.hashService.matchPassword(password, email);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      access_token: await this.jwtService.signAsync(user, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async singUp(signUpDto: CreateUserDto) {
    const passwordHash = await this.hashService.hashPassword(
      signUpDto.password,
    );
    const { id, firstName, lastName } = await this.userService.createUser({
      ...signUpDto,
      password: passwordHash,
    });

    return {
      access_token: await this.jwtService.signAsync(
        { id, firstName, lastName },
        {
          secret: process.env.JWT_SECRET,
        },
      ),
    };
  }
}