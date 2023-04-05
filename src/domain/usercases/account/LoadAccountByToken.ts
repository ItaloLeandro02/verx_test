import { AccountModel } from "@/domain/models/account/AccountModel";

export interface LoadAccountByToken {
    load (accessToken: string): Promise<AccountModel>;
}