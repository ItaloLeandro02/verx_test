import { faker } from '@faker-js/faker';
import validator from 'validator';
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter';

jest.mock('validator', () => ({
    isEmail (): boolean {
        return true;
    }
}));

type SutTypes = {
    sut: EmailValidatorAdapter
};

const makeSut = (): SutTypes => {
    const sut = new EmailValidatorAdapter();
    return {
        sut
    };
}

describe('EmailValidatorAdapter', () => {
    it ('Deve chamar EmailValidatorAdapter com o email correto', () => {
        const { sut } = makeSut();
        const isEmailSpy = jest.spyOn(validator, 'isEmail');
        const email = faker.internet.email();
        sut.isValid(email);
        expect(isEmailSpy).toHaveBeenCalledWith(email);
    });
    it ('Deve retornar true caso EmailValidatorAdapter retorne true', () => {
        const { sut } = makeSut();
        const email = faker.internet.email();
        const isEmail = sut.isValid(email);
        expect(isEmail).toBeTruthy();
    });
});