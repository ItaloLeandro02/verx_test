import { TokenChecker } from "@/data/protocols/criptography";
import { LoadAccountByTokenRepository } from "@/data/protocols/db/account/LoadAccountByTokenRepository";
import { AccountModel } from "@/domain/models/account/AccountModel";
import { LoadAccountByToken } from "@/domain/usercases/account";

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
        private readonly tokenCheck: TokenChecker,
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
    ) {}
    async load(accessToken: string): Promise<AccountModel | undefined> {
        const isTokenValid = await this.tokenCheck.verify(accessToken);
        if (isTokenValid) {
            const account = await this.loadAccountByTokenRepository.loadBytoken(accessToken);
            return account;
        }
        return undefined as unknown as AccountModel;
    }
}