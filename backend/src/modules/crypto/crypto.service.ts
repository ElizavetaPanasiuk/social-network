import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class CryptoService {
  encrypt(value: string) {
    console.log('Value to encrypt:', value);
    const iv = randomBytes(16);
    const cipher = createCipheriv(
      process.env.CRYPTO_ALGORITHM,
      process.env.CRYPTO_SECRET,
      iv,
    );
    const ciphertext = cipher.update(value, 'utf8', 'hex');
    console.log('CIPH1:', ciphertext);
    console.log('CIPHERTEXT:', ciphertext.toString());
    console.log('IV:', iv.toString('hex'));
    return { ciphertext: ciphertext.toString(), iv: iv.toString('hex') };
  }

  decrypt(value: string, iv: string) {
    const decipher = createDecipheriv(
      process.env.CRYPTO_ALGORITHM,
      process.env.CRYPTO_SECRET,
      Buffer.from(iv, 'hex'),
    );
    const decrypted = decipher.update(value, 'utf8');
    return decrypted.toString('hex');
  }
}
