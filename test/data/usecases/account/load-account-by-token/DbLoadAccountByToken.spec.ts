import { DecrypterSpy } from "@/data/test";
import { DbLoadAccountByToken } from "@/data/usecases/account/DbLoadAccountByToken";
import { faker } from "@faker-js/faker";

type SutTypes = { 
    sut: DbLoadAccountByToken,
    decrypter: DecrypterSpy
};

const makeSut = (): SutTypes => {
    const decrypter = new DecrypterSpy(); 
    const sut = new DbLoadAccountByToken(decrypter);
    return {
        sut,
        decrypter
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
    });
});