import jwt from 'jsonwebtoken';
import { TokenChecker, Encrypter } from "@/data/protocols/criptography";

export class JwtAdapter implements Encrypter, TokenChecker {
    constructor(
        private readonly secretKey: string
    ) {}
    
    async encrypt(plainValue: string): Promise<string> {
        const token = await jwt.sign({ id: plainValue }, this.secretKey); 
        return token;
    }
    async verify(encryptedText: string): Promise<boolean> {
        const decoded = await jwt.verify(encryptedText, this.secretKey);
        return !!decoded;
    }
}