import jwt from 'jsonwebtoken';
import { faker } from "@faker-js/faker";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/JwtAdapter";

jest.mock('jsonwebtoken', () => ({
    sign (): Promise<Object> {
        return Promise.resolve('any_token');
    },
    verify (): Promise<Object> {
        return Promise.resolve({ iat: 12321 });
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
        it ('Deve lançar uma exceção caso Sign falhe', async () => {
            const sut = new JwtAdapter(secret);
            jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() });
            const promise = sut.encrypt('any_value');
            await expect(promise).rejects.toThrow();
        });
    });
    describe('verify()', () => {
        it ('Deve chamar verify com os dados corretos', async () => {
            const verifySpy = jest.spyOn(jwt, 'verify');
            const sut = new JwtAdapter(secret);
            await sut.verify('any_token');
            expect(verifySpy).toHaveBeenCalledWith('any_token', secret);
        }); 
        it ('Deve retornar um valor em caso de sucesso', async () => {
            const sut = new JwtAdapter(secret);
            const value = await sut.verify('any_token');
            expect(value).toBe(true);
        });
    });
});