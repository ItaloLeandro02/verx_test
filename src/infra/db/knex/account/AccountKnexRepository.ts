import { Knex } from "knex";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/LoadAccountByEmailRepository";
import { AccountModel } from "@/domain/models/account/AccountModel";

export class AccountKnexRepository implements LoadAccountByEmailRepository {
    constructor(
        private readonly connection: Knex
    ) {}
    async loadByEmail(email: string): Promise<AccountModel | undefined> {
        const account = await this.connection.select().from('accounts').where('email', email).first();
        return account;
    }
}