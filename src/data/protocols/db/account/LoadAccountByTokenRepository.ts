import { AccountModel } from "@/domain/models/account/AccountModel";

export interface LoadAccountByTokenRepository {
    loadBytoken (token: string): Promise<AccountModel | undefined>;
}