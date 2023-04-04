import bcrypt from 'bcrypt';
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/BcryptAdapter';

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
            expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
        });
    });
});