import { faker } from "@faker-js/faker";
import { InvalidParamError } from "@/presentation/errors";
import { GreaterThanFieldValidation } from "@/validation/validators";

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
        const input = { field: faker.lorem.word(7) };
        const error = sut.validate(input);
        expect(error).toEqual(new InvalidParamError('field'));
    });
    it ('Deve retornar undefined caso o campo seja maior ou igual do que oito caracteres', () => {
        const { sut } = makeSut();
        const input = { field: faker.lorem.word(8) };
        const error = sut.validate(input);
        expect(error).toBeUndefined();
    });
});