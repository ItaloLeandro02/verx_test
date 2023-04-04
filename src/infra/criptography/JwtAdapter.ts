import jwt from 'jsonwebtoken';
import { Encrypter } from "@/data/protocols/criptography/Encrypter";

export class JwtAdapter implements Encrypter {
    constructor(
        private readonly secretKey: string
    ) {}

    async encrypt(plainValue: string): Promise<string> {
        jwt.sign({ id: plainValue }, this.secretKey); 
        return '';
    }
}