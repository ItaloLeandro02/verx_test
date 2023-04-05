import { faker } from "@faker-js/faker";
import { InvalidParamError, MissingParamError } from "@/presentation/errors";
import { GreaterThanFieldValidation, RequiredFieldValidation } from "@/validation/validators";

type SutTypes = {
    sut: GreaterThanFieldValidation
};

const makeSut = (): SutTypes => {
    const fieldLength = 8;
    const sut = new GreaterThanFieldValidation('field', fieldLength);
    return {
        sut
    };
}

describe('GreaterThanFieldValidation', () => {
    it ('Deve retornar InvalidParamError caso o campo seja menor do que oito caracteres', () => {
        const { sut } = makeSut();
        const input = { name: faker.lorem.lines(7) };
        const error = sut.validate(input);
        expect(error).toEqual(new InvalidParamError('field'));
    });
});