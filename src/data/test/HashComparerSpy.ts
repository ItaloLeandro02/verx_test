import { HashComparer } from "@/data/protocols/criptography";

export class HashComparerSpy implements HashComparer {
    plainTextParam: string = ''; 
    digestParam: string = ''
    
    async compare (plainText: string, digest: string): Promise<boolean> {
        this.plainTextParam = plainText;
        this.digestParam = digest;
        return Promise.resolve(true);
    }
}