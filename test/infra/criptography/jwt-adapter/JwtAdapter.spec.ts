import jwt from 'jsonwebtoken';
import { faker } from "@faker-js/faker";
import { JwtAdapter } from "@/infra/criptography/JwtAdapter";

jest.mock('jsonwebtoken', () => ({
    sign (): Promise<string> {
        return Promise.resolve('any_token');
    }
}));

const secret = faker.random.word();

describe('JwtAdapter', () => {
    describe('sign()', () => {
        it ('Deve chamar sign com os valores corretos', async () => {
            const signSpy = jest.spyOn(jwt, 'sign');
            const sut = new JwtAdapter(secret);
            await sut.encrypt('any_value');
            expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, secret);
        });
        it ('Deve retornar um token em caso de sucesso', async () => {
            const sut = new JwtAdapter(secret);
            const token = await sut.encrypt('any_value');
            expect(token).toBe('any_token');
        });
    });
});