import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/LoadAccountByEmailRepository";
import { Authentication, AuthenticationParams } from "@/domain/usercases/account";

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    ) {}

    async auth(authentication: AuthenticationParams): Promise<string> {
        await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
        return '';
    }
}