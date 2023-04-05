import { AccountModel } from "@/domain/models/account/AccountModel";
import { LoadAccountByTokenRepository } from "@/data/protocols/db/account/LoadAccountByTokenRepository";
import { faker } from "@faker-js/faker";

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
    tokenParam: string = null as unknown as string;
    mockAccount?: AccountModel = {
        id: faker.random.numeric(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        acessToken: faker.internet.password()
    };

    async loadBytoken(token: string): Promise<AccountModel | undefined> {
        this.tokenParam = token;
        return Promise.resolve(this.mockAccount);
    }
}