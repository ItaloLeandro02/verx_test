import { faker } from "@faker-js/faker";
import { InvalidParamError } from "@/presentation/errors";
import { EmailValidator } from "@/validation/EmailValidator";

describe('EmailValidator', () => {
    it ('Deve retornar erro caso EmailValidator retorne false', () => {
        const sut = new EmailValidator();
        const input = { email: faker.internet.email() };
        const error = sut.validate(input);
        expect(error).toEqual(new InvalidParamError('email'));
    });
});