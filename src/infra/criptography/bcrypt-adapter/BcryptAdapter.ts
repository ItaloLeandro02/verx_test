import bcrypt from 'bcrypt';
import { HashComparer } from "@/data/protocols/criptography";

export class BcryptAdapter implements HashComparer {
    constructor(
        private readonly salt: number
    ) {}

    async compare(plainText: string, digest: string): Promise<boolean> {
        const isValid = await bcrypt.compare(plainText, digest);
        return isValid;    
    }
}