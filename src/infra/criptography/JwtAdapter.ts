import jwt from 'jsonwebtoken';
import { Decrypter, Encrypter } from "@/data/protocols/criptography";

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(
        private readonly secretKey: string
    ) {}
    
    async encrypt(plainValue: string): Promise<string> {
        const token = await jwt.sign({ id: plainValue }, this.secretKey); 
        return token;
    }
    async decrypt(encryptedText: string): Promise<string> {
        const decoded = await jwt.verify(encryptedText, this.secretKey);
        return decoded.toString();
    }
}