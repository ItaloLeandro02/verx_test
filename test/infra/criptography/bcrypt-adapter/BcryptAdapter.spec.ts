import bcrypt from 'bcrypt';
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/BcryptAdapter';

jest.mock('bcrypt', () => ({
    async compare() : Promise<boolean> {
        return Promise.resolve(true);
    }
}));

type SutTypes = {
    sut: BcryptAdapter
};

const salt = 12; 
const makeSut = (): SutTypes => {
    const sut = new BcryptAdapter(salt);
    return {
        sut
    }
};

describe('BcryptAdapter', () => {
    describe('compare', () => {
        it ('Deve chamar compare com os valores corretos', async () => {
            const { sut } = makeSut();
            const compareSpy = jest.spyOn(bcrypt, 'compare');
            await sut.compare('any_value', 'any_hash');
            expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
        });
        it ('Deve retornar true caso compare retorne true', async () => {
            const { sut } = makeSut();
            const isValid = await sut.compare('any_value', 'any_hash');
            expect(isValid).toBeTruthy();
        });
        it ('Deve retornar false caso compare retorne false', async () => {
            const { sut } = makeSut();
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.resolve(false));
            const isValid = await sut.compare('any_value', 'any_hash');
            expect(isValid).toBeFalsy();
        });
        it ('Deve retornar uma exceção caso compare falhe', async () => {
            const { sut } = makeSut();
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => { throw new Error() });
            const promise = sut.compare('any_value', 'any_hash');
            await expect(promise).rejects.toThrow();
        });
    });
});