import jwt from 'jsonwebtoken';
import { Decrypter, Encrypter } from "@/data/protocols/criptography";

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(
        private readonly secretKey: string
    ) {}
    
    async encrypt(plainValue: string): Promise<string> {
        const token = jwt.sign({ id: plainValue }, this.secretKey); 
        return Promise.resolve(token);
    }
    async decrypt(encryptedText: string): Promise<string> {
        jwt.verify(encryptedText, this.secretKey);
        return '';
    }
}