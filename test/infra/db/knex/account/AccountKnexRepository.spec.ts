import { AccountKnexRepository } from "@/infra/db/knex/account/AccountKnexRepository";
import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";

type SutTypes = {
    sut: AccountKnexRepository
};

const makeSut = (): SutTypes => {
    const connection = KnexHelper.connection;
    const sut = new AccountKnexRepository(connection);
    return {
        sut
    };
};

const defaultAccount = {
    id: 1,
    name: 'Verx',
    email: 'verx@mail.com.br',
    password: '123345'
};

describe('AccountKnexRepository', () => {
    describe('LoadAccountByEmailRepository', () => {
        beforeAll(async () => {
            await KnexHelper.connect();
            await KnexHelper.runMigrations();
            await KnexHelper.runSeeders();
        });
        afterEach(async () => {
            await KnexHelper.deleteData('accounts');
        });
        afterAll(async () => {
            await KnexHelper.roolbackMigrations();
        });

        it ('Deve retornar um account caso exista um registro no banco com o email informado', async () => {
            const { sut } = makeSut();
            const account = await sut.loadByEmail(defaultAccount.email);
            expect(account).toBeTruthy();
            expect(account?.id).toBeTruthy();
            expect(account?.name).toBe(defaultAccount.name);
            expect(account?.email).toBe(defaultAccount.email);
            expect(account?.password).toBe(defaultAccount.password);
        });
        it ('Deve retornar undefined caso não haja nenhum registro no banco com o email informado', async () => {
            const { sut } = makeSut();
            const account = await sut.loadByEmail(defaultAccount.email);
            expect(account).toBeFalsy();
        });
    });
});