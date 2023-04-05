import { faker } from "@faker-js/faker";
import { DecrypterSpy } from "@/data/test";
import { LoadAccountByTokenRepositorySpy } from "@/data/test/LoadAccountByTokenRepositorySpy";
import { DbLoadAccountByToken } from "@/data/usecases/account/DbLoadAccountByToken";

type SutTypes = { 
    sut: DbLoadAccountByToken,
    decrypter: DecrypterSpy,
    loadAccountByTokenRepository: LoadAccountByTokenRepositorySpy
};

const makeSut = (): SutTypes => {
    const decrypter = new DecrypterSpy(); 
    const loadAccountByTokenRepository = new LoadAccountByTokenRepositorySpy(); 
    const sut = new DbLoadAccountByToken(decrypter, loadAccountByTokenRepository);
    return {
        sut,
        decrypter,
        loadAccountByTokenRepository
    }
};
const token = faker.internet.password();

describe('DbLoadAccountByToken', () => {
    describe('Decrypter', () => {
        it ('Deve chamar Decrypter com os valores corretos', async () => {
            const { sut, decrypter } = makeSut();
            await sut.load(token);
            expect(decrypter.encryptedTextParam).toBe(token);
        });
        it ('Deve retornar undefined caso Decrypter retorne undefined', async () => {
            const { sut, decrypter } = makeSut();
            decrypter.decryptedTextResult = undefined;
            const account = await sut.load(token);
            expect(account).toBeUndefined();
        });
        it ('Deve retornar uma exceção caso Decrypter falhe', async () => {
            const { sut, decrypter } = makeSut();
            jest.spyOn(decrypter, 'decrypt').mockImplementationOnce(() => { throw new Error() });
            const promise = sut.load(token);
            await expect(promise).rejects.toThrowError(new Error());
        });
    });
    describe('LoadAccountByTokenRepository', () => {
        it ('Deve chamar LoadAccountByTokenRepository com os valores corretos', async () => {
            const { sut, loadAccountByTokenRepository, decrypter } = makeSut();
            await sut.load(token);
            expect(loadAccountByTokenRepository.tokenParam).toBe(decrypter.decryptedTextResult);
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
        const { sut, loadAccountByTokenRepository, decrypter } = makeSut();
        const account = await sut.load(token);
        expect(account).toEqual(loadAccountByTokenRepository.mockAccount);
        expect(loadAccountByTokenRepository.tokenParam).toEqual(decrypter.decryptedTextResult);
    });
});