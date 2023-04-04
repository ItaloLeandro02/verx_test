import { faker } from "@faker-js/faker";
import { InvalidParamError } from "@/presentation/errors";
import { EmailValidator } from "@/validation/protocols";
import { EmailValidation } from "@/validation/validators";
import { EmailValidatorSpy } from "@/validation/test";

type SutTypes = {
    sut: EmailValidation,
    emailValidator: EmailValidatorSpy
};

const makeSut = (): SutTypes => {
    const emailValidator = new EmailValidatorSpy();
    const sut = new EmailValidation('email', emailValidator);
    return {
        sut,
        emailValidator
    };
};

describe('EmailValidation', () => {
    it ('Deve retornar erro caso EmailValidator retorne false', () => {
        const { sut, emailValidator } = makeSut();
        emailValidator.emailIsValid = false;
        const input = { email: faker.internet.email() };
        const error = sut.validate(input);
        expect(error).toEqual(new InvalidParamError('email'));
    });
    it ('Deve chamar EmailValidator com os valores corretos', () => {
        const { sut, emailValidator } = makeSut();
        const input = { email: faker.internet.email() };
        sut.validate(input);
        expect(emailValidator.emailParam).toEqual(input.email);
    });
    it ('Deve retornar undefined caso o email esteja correto', () => {
        const { sut } = makeSut();
        const input = { email: faker.internet.email() };
        const error = sut.validate(input);
        expect(error).toBeFalsy();
    });
    it ('Deve lançar uma exceção caso EmailValidator falhe', () => {
        const { sut, emailValidator } = makeSut();
        jest.spyOn(emailValidator, 'isValid').mockImplementationOnce(() => { throw new Error() });
        expect(sut.validate).toThrow();
    });
});