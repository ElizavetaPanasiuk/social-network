import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async matchPassword(password: string, passwordHash: string) {
    const isMatch = await bcrypt.compare(password, passwordHash);
    return isMatch;
  }
}
