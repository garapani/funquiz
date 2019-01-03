import * as crypto from 'crypto';

export enum Ciphers {
  AES_128 = 'aes128', // requires 16 byte key
  AES_128_CBC = 'aes-128-cbc', // requires 16 byte key
  AES_192 = 'aes192', // requires 24 byte key
  AES_256 = 'aes256' // requires 32 byte key
}

export class CryptoUtil {
  public encryptText(
    cipherAlg: Ciphers,
    key: Buffer,
    iv: Buffer,
    text: string,
    encoding: any
  ): string {
    const cipher: crypto.Cipher = crypto.createCipheriv(cipherAlg, key, iv);

    encoding = encoding || 'binary';

    let result: string = cipher.update(text, 'utf8', encoding);
    result += cipher.final(encoding);

    return result;
  }

  public decryptText(
    cipherAlg: Ciphers,
    key: Buffer,
    iv: Buffer,
    text: string,
    encoding: any
  ): Buffer {
    const decipher: crypto.Decipher = crypto.createDecipheriv(
      cipherAlg,
      key,
      iv
    );

    encoding = encoding || 'binary';

    const result: Buffer = decipher.update(text, encoding);
    return Buffer.concat([result, decipher.final()], 2);
  }

  private getIV(): Buffer {
    return crypto.pseudoRandomBytes(16);
  }
}
