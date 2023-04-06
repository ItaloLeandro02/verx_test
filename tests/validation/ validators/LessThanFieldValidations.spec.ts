import { faker } from "@faker-js/faker";
import { InvalidParamError } from "@/presentation/errors";
import { LessThanFieldValidation } from "@/validation/validators";

type SutTypes = {
    sut: LessThanFieldValidation
};

const makeSut = (): SutTypes => {
    const fieldLength = 8;
    const sut = new LessThanFieldValidation('field', fieldLength);
    return {
        sut
    };
}

describe('LessThanFieldValidation', () => {
    it ('Deve retornar InvalidParamError caso o campo seja maior do que oito caracteres', () => {
        const { sut } = makeSut();
        const input = { field: faker.lorem.word(9) };
        const error = sut.validate(input);
        expect(error).toEqual(new InvalidParamError('field'));
    });
    it ('Deve retornar undefined caso o campo seja igual a oito caracteres', () => {
        const { sut } = makeSut();
        const input = { field: faker.lorem.word(8) };
        const error = sut.validate(input);
        expect(error).toBeUndefined();
    });
    it ('Deve retornar undefined caso o campo seja menor do que oito caracteres', () => {
        const { sut } = makeSut();
        const input = { field: faker.lorem.word(7) };
        const error = sut.validate(input);
        expect(error).toBeUndefined();
    });
});