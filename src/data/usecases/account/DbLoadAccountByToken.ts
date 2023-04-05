import { Decrypter } from "@/data/protocols/criptography";
import { AccountModel } from "@/domain/models/account/AccountModel";
import { LoadAccountByToken } from "@/domain/usercases/account";

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
        private readonly decrypter: Decrypter
    ) {}
    async load(accessToken: string): Promise<AccountModel> {
        await this.decrypter.decrypt(accessToken);
        return null as unknown as AccountModel;
    }
}