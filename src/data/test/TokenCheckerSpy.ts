import { TokenChecker } from "@/data/protocols/criptography";

export class TokenCheckerSpy implements TokenChecker {
    tokenParam: string = null as unknown as string
    result: boolean = true;

    async verify(token: string): Promise<boolean> {
        this.tokenParam = token;
        return Promise.resolve(this.result); 
    }
}