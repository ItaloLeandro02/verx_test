import { Decrypter } from "@/data/protocols/criptography";

export class DecrypterSpy implements Decrypter {
    encryptedTextParam: string = null as unknown as string;
    
    async decrypt(encryptedText: string): Promise<string> {
        this.encryptedTextParam = encryptedText;
        return Promise.resolve('decrypted_text'); 
    }
}