import { faker } from "@faker-js/faker";
import { AuthenticationParams } from "@/domain/usercases/account";
import { DbAuthentication } from "@/data/usecases/account/DbAuthentication";
import { LoadAccountByEmailRepositorySpy } from "@/data/test";

type SutTypes = { 
    sut: DbAuthentication,
    loadAccountByEmailRepository: LoadAccountByEmailRepositorySpy
};

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepository = new LoadAccountByEmailRepositorySpy(); 
    const sut = new DbAuthentication(loadAccountByEmailRepository);
    return {
        sut,
        loadAccountByEmailRepository
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
    });
});