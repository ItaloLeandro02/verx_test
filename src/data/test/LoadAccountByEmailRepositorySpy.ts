import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/LoadAccountByEmailRepository";
import { AccountModel } from "@/domain/models/account/AccountModel";
import { faker } from "@faker-js/faker";

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
    emailParam: string = '';
    mockAccount: AccountModel;

    constructor() {
        this.mockAccount = {
            id: faker.random.numeric(),
            email: faker.internet.email(),
            name: faker.name.fullName(),
            password: faker.internet.password()
        }
    }

    async loadByEmail(email: string): Promise<AccountModel> {
        this.emailParam = email;
        return Promise.resolve(this.mockAccount);
    }
}