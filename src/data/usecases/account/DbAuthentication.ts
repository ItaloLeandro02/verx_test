import { Encrypter, HashComparer } from "@/data/protocols/criptography";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/LoadAccountByEmailRepository";
import { Authentication, AuthenticationParams } from "@/domain/usercases/account";

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter
    ) {}

    async auth(authentication: AuthenticationParams): Promise<string | undefined> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password);
            if (isValid) {
                const token = await this.encrypter.encrypt(account.id);
                return token;
            }
        }
        return undefined;
    }
}