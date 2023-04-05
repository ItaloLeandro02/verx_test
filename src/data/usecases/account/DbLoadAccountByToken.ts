import { Decrypter } from "@/data/protocols/criptography";
import { AccountModel } from "@/domain/models/account/AccountModel";
import { LoadAccountByToken } from "@/domain/usercases/account";

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
        private readonly decrypter: Decrypter
    ) {}
    async load(accessToken: string): Promise<AccountModel | undefined> {
        await this.decrypter.decrypt(accessToken);
        return undefined as unknown as AccountModel;
    }
}