import { UpdateAccessTokenRepository } from "@/data/protocols/db/account/UpdateAccessTokenRepository";

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
    idParam: string = '';
    tokenParam: string = '';

    async updateAccessToken(id: string, token: string): Promise<void> {
        this.idParam = id;
        this.tokenParam = token;
    }
}