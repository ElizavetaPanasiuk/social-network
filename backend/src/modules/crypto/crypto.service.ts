import { Injectable } from '@nestjs/common';
import {
  createCipheriv,
  randomBytes,
  createDecipheriv,
  createHash,
} from 'crypto';

@Injectable()
export class CryptoService {
  private algorithm = process.env.CRYPTO_ALGORITHM;
  private key = createHash('sha256')
    .update(String(process.env.CRYPTO_SECRET))
    .digest('base64')
    .slice(0, 32);

  encrypt(data: string) {
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, this.key, iv);
    const result = Buffer.concat([iv, cipher.update(data), cipher.final()]);
    const encrypted = Buffer.from(result).toString('hex');
    return encrypted;
  }

  decrypt(data: string) {
    const buffer = Buffer.from(data, 'hex');
    const iv = buffer.subarray(0, 16);
    const encryptedString = buffer.subarray(16);
    const decipher = createDecipheriv(this.algorithm, this.key, iv);
    const result = Buffer.concat([
      decipher.update(encryptedString),
      decipher.final(),
    ]);
    return result.toString();
  }
}
