import { AccountModel } from "@/domain/models/account/AccountModel";

export interface LoadAccountByEmailRepository {
    loadByEmail (email: string): Promise<AccountModel>
}