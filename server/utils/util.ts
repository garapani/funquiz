import * as cryptoUtil from './cryptoUtil';

class Util {
    public GenerateUniqueString(length: number = 10): string {
        let text: string = '';
        const possibleChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i: number = 0; i < length; i++) {
            text += possibleChars.charAt(
                Math.floor(Math.random() * possibleChars.length)
            );
        }
        return text;
    }

    public Encrypt(input: string): string {
        const keyBuffer: Buffer = new Buffer('1234567890abcdefghijklmnopqrstuv'); // should be 32 length
        const ivBuffer: Buffer = new Buffer('1234567890abcdef'); // should be 16 length
        let crypted: string = new cryptoUtil.CryptoUtil().encryptText(
            cryptoUtil.Ciphers.AES_256,
            keyBuffer,
            ivBuffer,
            input,
            'base64'
        );
        crypted = crypted.replace(/[^a-zA-Z0-9]/g, ''); // replace all special characters with empty
        return crypted;
    }
}

export default new Util();
