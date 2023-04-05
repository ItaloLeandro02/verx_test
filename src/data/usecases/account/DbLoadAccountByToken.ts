import { Decrypter } from "@/data/protocols/criptography";
import { LoadAccountByTokenRepository } from "@/data/protocols/db/account/LoadAccountByTokenRepository";
import { AccountModel } from "@/domain/models/account/AccountModel";
import { LoadAccountByToken } from "@/domain/usercases/account";

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
        private readonly decrypter: Decrypter,
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
    ) {}
    async load(accessToken: string): Promise<AccountModel | undefined> {
        const token = await this.decrypter.decrypt(accessToken);
        if (token) {
            await this.loadAccountByTokenRepository.loadBytoken(token);
        }
        return undefined as unknown as AccountModel;
    }
}