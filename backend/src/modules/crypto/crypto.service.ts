import { Injectable } from '@nestjs/common';
import {
  scrypt,
  createCipheriv,
  createDecipheriv,
  randomFill,
  scryptSync,
} from 'crypto';

@Injectable()
export class CryptoService {
  async encrypt(value: string, callback: (text: string, iv: string) => void) {
    let encryptionResult;
    await scrypt(process.env.CRYPTO_SECRET, 'salt', 24, (err, key) => {
      if (err) throw err;
      randomFill(new Uint8Array(16), (err, iv) => {
        if (err) throw err;
        const cipher = createCipheriv(process.env.CRYPTO_ALGORITHM, key, iv);
        let encrypted = '';
        cipher.setEncoding('hex');
        cipher.on('data', (chunk) => (encrypted += chunk));
        cipher.on('end', () =>
          callback(encrypted, Buffer.from(iv).toString('hex')),
        );

        cipher.write(value);
        cipher.end();
      });
    });
    return encryptionResult;
  }

  decrypt(value: string, iv: string, callback: (decrypted: string) => void) {
    const key = scryptSync(process.env.CRYPTO_SECRET, 'salt', 24);
    console.log('key:', key);
    console.log('iv: ', new Uint8Array(Buffer.from(iv, 'hex')));

    const decipher = createDecipheriv(
      process.env.CRYPTO_ALGORITHM,
      key,
      new Uint8Array(Buffer.from(iv, 'hex')),
    );
    let decrypted = '';
    decipher.on('readable', () => {
      let chunk;
      while (null !== (chunk = decipher.read())) {
        console.log('CHUNK:', chunk.toString('utf8'));
        decrypted += chunk.toString('utf8');
      }
    });
    decipher.on('end', () => {
      console.log('end'); // end doesn't happen
      callback(decrypted);
    });
    decipher.write(value, 'hex');
    decipher.end();
  }
}
