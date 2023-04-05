import { faker } from "@faker-js/faker";
import { TokenCheckerSpy } from "@/data/test";
import { LoadAccountByTokenRepositorySpy } from "@/data/test/LoadAccountByTokenRepositorySpy";
import { DbLoadAccountByToken } from "@/data/usecases/account/DbLoadAccountByToken";

type SutTypes = { 
    sut: DbLoadAccountByToken,
    tokenChecker: TokenCheckerSpy,
    loadAccountByTokenRepository: LoadAccountByTokenRepositorySpy
};

const makeSut = (): SutTypes => {
    const tokenChecker = new TokenCheckerSpy(); 
    const loadAccountByTokenRepository = new LoadAccountByTokenRepositorySpy(); 
    const sut = new DbLoadAccountByToken(tokenChecker, loadAccountByTokenRepository);
    return {
        sut,
        tokenChecker,
        loadAccountByTokenRepository
    }
};
const token = faker.internet.password();

describe('DbLoadAccountByToken', () => {
    describe('TokenChecker', () => {
        it ('Deve chamar TokenCheckerSpy com os valores corretos', async () => {
            const { sut, tokenChecker } = makeSut();
            await sut.load(token);
            expect(tokenChecker.tokenParam).toBe(token);
        });
        it ('Deve retornar undefined caso TokenCheckerSpy retorne undefined', async () => {
            const { sut, tokenChecker } = makeSut();
            tokenChecker.result = false;
            const account = await sut.load(token);
            expect(account).toBeUndefined();
        });
        it ('Deve retornar uma exceção caso TokenCheckerSpy falhe', async () => {
            const { sut, tokenChecker } = makeSut();
            jest.spyOn(tokenChecker, 'verify').mockImplementationOnce(() => { throw new Error() });
            const promise = sut.load(token);
            await expect(promise).rejects.toThrowError(new Error());
        });
    });
    describe('LoadAccountByTokenRepository', () => {
        it ('Deve chamar LoadAccountByTokenRepository com os valores corretos', async () => {
            const { sut, loadAccountByTokenRepository, tokenChecker } = makeSut();
            await sut.load(token);
            expect(loadAccountByTokenRepository.tokenParam).toBe(tokenChecker.tokenParam);
        });
        it ('Deve retornar undefined caso LoadAccountByTokenRepository retorne undefined', async () => {
            const { sut, loadAccountByTokenRepository } = makeSut();
            loadAccountByTokenRepository.mockAccount = undefined;
            const account = await sut.load(token);
            expect(account).toBeUndefined();
        });
        it ('Deve retornar uma exceção caso LoadAccountByTokenRepository falhe', async () => {
            const { sut, loadAccountByTokenRepository } = makeSut();
            jest.spyOn(loadAccountByTokenRepository, 'loadBytoken').mockImplementationOnce(() => { throw new Error() });
            const promise = sut.load(token);
            await expect(promise).rejects.toThrowError(new Error());
        });
    });
    it ('Deve retornar um account em caso de sucesso', async () => {
        const { sut, loadAccountByTokenRepository, tokenChecker } = makeSut();
        const account = await sut.load(token);
        expect(account).toEqual(loadAccountByTokenRepository.mockAccount);
    });
});