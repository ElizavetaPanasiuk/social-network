import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class HashService {
  constructor(private userService: UsersService) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async matchPassword(password: string, email: string) {
    const userPasswordHash = await this.userService.getUserPasswordByEmail(
      email,
    );
    const isMatch = await bcrypt.compare(password, userPasswordHash);
    return isMatch;
  }
}
