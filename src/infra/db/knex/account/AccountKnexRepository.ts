import { Knex } from "knex";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/LoadAccountByEmailRepository";
import { AccountModel } from "@/domain/models/account/AccountModel";
import { UpdateAccessTokenRepository } from "@/data/protocols/db/account/UpdateAccessTokenRepository";
import { LoadAccountByTokenRepository } from "@/data/protocols/db/account/LoadAccountByTokenRepository";

export class AccountKnexRepository implements LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
    constructor(
        private readonly connection: Knex
    ) {}
    
    async loadByEmail(email: string): Promise<AccountModel | undefined> {
        const account = await this.connection.select().from<AccountModel>('accounts').where('email', email).first();
        return account;
    }
    async updateAccessToken(id: string | number, token: string): Promise<void> {
        await this.connection('accounts').update({ accessToken: token }).where('id', id);
    }
    async loadBytoken(token: string): Promise<AccountModel | undefined> {
        const account = await this.connection.select().from<AccountModel>('accounts').where('accessToken', token).first();
        return account;
    }
}