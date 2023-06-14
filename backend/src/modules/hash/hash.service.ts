import * as bcrypt from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HashService {
  private logger = new Logger('HASH');

  async hashPassword(password: string) {
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
      const hash = await bcrypt.hash(password, salt);

      return hash;
    } catch (error) {
      this.logger.error('Failed to generate hash for password', error);
      throw new Error(error);
    }
  }

  async matchPassword(password: string, passwordHash: string) {
    try {
      const isMatch = await bcrypt.compare(password, passwordHash);

      return isMatch;
    } catch (error) {
      this.logger.error('Failed to match password with hash', error);
      throw new Error(error);
    }
  }
}
