import { faker } from "@faker-js/faker";
import { InvalidParamError } from "@/presentation/errors";
import { EmailValidator } from "@/validation/protocols";
import { EmailValidation } from "@/validation/validators";

type SutTypes = {
    sut: EmailValidation,
    emailValidator: EmailValidator
};

const makeSut = (): SutTypes => {
    const emailValidator = makeEmailValidatorMock();
    const sut = new EmailValidation('email', emailValidator);
    return {
        sut,
        emailValidator
    };
};
const makeEmailValidatorMock = (): EmailValidator => {
    class EmailValidatorMock implements EmailValidator {
        emailIsValid: boolean = true;
        isValid(email: string): boolean {
            return this.emailIsValid;
        }
    }
    return new EmailValidatorMock();
};

describe('EmailValidation', () => {
    it ('Deve retornar erro caso EmailValidator retorne false', () => {
        const { sut } = makeSut();
        const input = { email: faker.internet.email() };
        const error = sut.validate(input);
        expect(error).toEqual(new InvalidParamError('email'));
    });
});