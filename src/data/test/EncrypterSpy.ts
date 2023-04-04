import { Encrypter } from "@/data/protocols/criptography";

export class EncrypterSpy implements Encrypter {
    encryptParam: string = '';

    async encrypt(plainValue: string): Promise<string> {
        this.encryptParam = plainValue;
        return Promise.resolve('encrypted_value');
    }
}