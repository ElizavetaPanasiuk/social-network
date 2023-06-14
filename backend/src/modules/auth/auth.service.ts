import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { HashService } from '@/hash/hash.service';
import { CreateUserDto } from '@/users/dto';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.getLoginData(email);
    if (!user) {
      throw new NotFoundException("User with this email doesn't exist");
    }
    const passwordHash = await this.usersService.getUserPasswordByEmail(email);
    const isMatch = await this.hashService.matchPassword(
      password,
      passwordHash,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }

  async singUp(file: Express.Multer.File, signUpDto: CreateUserDto) {
    const passwordHash = await this.hashService.hashPassword(
      signUpDto.password,
    );
    const { id, firstName, lastName } = await this.usersService.createUser(
      file,
      {
        ...signUpDto,
        password: passwordHash,
      },
    );

    return {
      access_token: await this.jwtService.signAsync({
        id,
        firstName,
        lastName,
      }),
    };
  }
}
