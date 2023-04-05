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
const mockInput = () => ({
    accessToken: faker.database.mongodbObjectId()
});

describe('DbLoadAccountByToken', () => {
    describe('Decrypter', () => {
        it ('Deve chamar Decrypter com os valores corretos', async () => {
            const { sut, decrypter } = makeSut();
            const input = mockInput();
            await sut.load(input.accessToken);
            expect(decrypter.encryptedTextParam).toBe(input.accessToken);
        });
        it ('Deve retornar undefined caso Decrypter retorne undefined', async () => {
            const { sut, decrypter } = makeSut();
            decrypter.decryptedTextResult = undefined;
            const input = mockInput();
            const account = await sut.load(input.accessToken);
            expect(account).toBeUndefined();
        });
        it ('Deve retornar uma exceção caso Decrypter falhe', async () => {
            const { sut, decrypter } = makeSut();
            jest.spyOn(decrypter, 'decrypt').mockImplementationOnce(() => { throw new Error() });
            const input = mockInput();
            const promise = sut.load(input.accessToken);
            await expect(promise).rejects.toThrowError(new Error());
        });
    });
    describe('LoadAccountByTokenRepository', () => {
        it ('Deve chamar LoadAccountByTokenRepository com os valores corretos', async () => {
            const { sut, loadAccountByTokenRepository, decrypter } = makeSut();
            const input = mockInput();
            await sut.load(input.accessToken);
            expect(loadAccountByTokenRepository.tokenParam).toBe(decrypter.decryptedTextResult);
        });
    });
});