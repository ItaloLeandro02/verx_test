import { Encrypter } from "@/data/protocols/criptography";

export class EncrypterSpy implements Encrypter {
    encryptParam: string = '';
    encryptResult: string = 'encrypted_value';

    async encrypt(plainValue: string): Promise<string> {
        this.encryptParam = plainValue;
        return Promise.resolve(this.encryptResult);
    }
}