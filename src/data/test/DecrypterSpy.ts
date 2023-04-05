import { Decrypter } from "@/data/protocols/criptography";

export class DecrypterSpy implements Decrypter {
    encryptedTextParam: string = null as unknown as string;
    decryptedTextResult?: string = 'decrypted_text' as unknown as string;
    
    async decrypt(encryptedText: string): Promise<string | undefined> {
        this.encryptedTextParam = encryptedText;
        return Promise.resolve(this.decryptedTextResult); 
    }
}