import { faker } from "@faker-js/faker";
import { AuthenticationParams } from "@/domain/usercases/account";
import { DbAuthentication } from "@/data/usecases/account/DbAuthentication";
import { HashComparerSpy, LoadAccountByEmailRepositorySpy } from "@/data/test";

type SutTypes = { 
    sut: DbAuthentication,
    loadAccountByEmailRepository: LoadAccountByEmailRepositorySpy,
    hashComparer: HashComparerSpy
};

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepository = new LoadAccountByEmailRepositorySpy(); 
    const hashComparer = new HashComparerSpy(); 
    const sut = new DbAuthentication(loadAccountByEmailRepository, hashComparer);
    return {
        sut,
        loadAccountByEmailRepository,
        hashComparer
    }
};
const mockInput = (): AuthenticationParams => ({
    email: faker.internet.email(),
    password: faker.internet.password()
});

describe('DbAuthentication', () => {
    describe('LoadAccountByEmailRepository', () => {
        it ('Deve chamar LoadAccountByEmailRepository com o email correto', async () => {
            const { sut, loadAccountByEmailRepository } = makeSut();
            const input = mockInput();
            await sut.auth(input);
            expect(loadAccountByEmailRepository.emailParam).toBe(input.email);
        });
        it ('Deve retornar uma exceção caso LoadAccountByEmailRepository falhe', async () => {
            const { sut, loadAccountByEmailRepository } = makeSut();
            jest.spyOn(loadAccountByEmailRepository, 'loadByEmail').mockImplementationOnce(() => { throw new Error() });
            const input = mockInput();
            const promise = sut.auth(input);
            await expect(promise).rejects.toThrow();
        });
        it ('Deve retornar undefined caso LoadAccountByEmailRepository retorne undefined', async () => {
            const { sut, loadAccountByEmailRepository } = makeSut();
            loadAccountByEmailRepository.mockAccount = undefined;
            const input = mockInput();
            const model = await sut.auth(input);
            expect(model).toBeUndefined();
        });
    });
    describe('HashComparer', () => {
        it ('Deve chamar HashComparer com os valores corretos', async () => {
            const { sut, loadAccountByEmailRepository, hashComparer } = makeSut();
            const input = mockInput();
            await sut.auth(input);
            expect(hashComparer.plainTextParam).toBe(input.password);
            expect(hashComparer.digestParam).toBe(loadAccountByEmailRepository.mockAccount?.password);
        });
    });
});