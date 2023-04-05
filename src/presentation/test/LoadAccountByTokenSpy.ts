import { AccountModel } from "@/domain/models/account/AccountModel";
import { LoadAccountByToken } from "@/domain/usercases/account";
import { faker } from "@faker-js/faker";

export class LoadAccountByTokenSpy implements LoadAccountByToken {
    acessTokenParam: string = null as unknown as string;
    mockAccountModel?: AccountModel = {
        id: faker.random.numeric(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    async load(accessToken: string): Promise<AccountModel | undefined> {
        this.acessTokenParam = accessToken;
        return Promise.resolve(this.mockAccountModel);
    }
}