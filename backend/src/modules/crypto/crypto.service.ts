import { Injectable, Logger } from '@nestjs/common';
import {
  createCipheriv,
  randomBytes,
  createDecipheriv,
  createHash,
} from 'crypto';

@Injectable()
export class CryptoService {
  private logger = new Logger('CRYPTO');
  private algorithm = process.env.CRYPTO_ALGORITHM;
  private key = createHash('sha256')
    .update(String(process.env.CRYPTO_SECRET))
    .digest('base64')
    .slice(0, 32);

  encrypt(data: string) {
    try {
      const iv = randomBytes(16);
      const cipher = createCipheriv(this.algorithm, this.key, iv);
      const result = Buffer.concat([iv, cipher.update(data), cipher.final()]);
      const encrypted = Buffer.from(result).toString('hex');

      return encrypted;
    } catch (error) {
      this.logger.error('Failed to encrypt data', error);
      throw new Error(error);
    }
  }

  decrypt(data: string) {
    try {
      const buffer = Buffer.from(data, 'hex');
      const iv = buffer.subarray(0, 16);
      const encryptedString = buffer.subarray(16);
      const decipher = createDecipheriv(this.algorithm, this.key, iv);
      const result = Buffer.concat([
        decipher.update(encryptedString),
        decipher.final(),
      ]);

      return result.toString();
    } catch (error) {
      this.logger.error('Failed to descrypt data', error);
      throw new Error(error);
    }
  }
}
