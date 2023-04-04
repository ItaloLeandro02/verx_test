import { faker } from '@faker-js/faker';
import validator from 'validator';
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter';

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
});