import { faker } from "@faker-js/faker";
import { InvalidParamError } from "@/presentation/errors";
import { EmailValidator } from "@/validation/EmailValidator";

type SutTypes = {
    sut: EmailValidator
};

const makeSut = (): SutTypes => {
    const sut = new EmailValidator();
    return {
        sut
    };
};

describe('EmailValidator', () => {
    it ('Deve retornar erro caso EmailValidator retorne false', () => {
        const { sut } = makeSut();
        const input = { email: faker.internet.email() };
        const error = sut.validate(input);
        expect(error).toEqual(new InvalidParamError('email'));
    });
});