import { InvalidParamError, MissingParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";
import { ValidationSpy } from "@/validation/test";
import { ValidationComposite } from "@/validation/validators";
import { faker } from "@faker-js/faker";

type SutTypes = {
    sut: ValidationComposite,
    validations: Validation[]
};

const makeSut = (): SutTypes => {
    const validations = [
        new ValidationSpy(),
        new ValidationSpy()
    ];
    const sut = new ValidationComposite(validations);
    return {
        sut,
        validations
    }
};

describe('ValidationComposite', () => {
    it ('Deve retornar um erro caso alguma validação falhe', () => {
        const { sut, validations } = makeSut();
        jest.spyOn(validations[0], 'validate').mockImplementationOnce(() => new InvalidParamError('field'));
        const input = { field: faker.random.word() };
        const error = sut.validate(input);
        expect(error).toEqual(new InvalidParamError('field'));
    });
    it ('Deve retornar o primeiro erro caso mais de uma validação falhe', () => {
        const { sut, validations } = makeSut();
        jest.spyOn(validations[0], 'validate').mockImplementationOnce(() => new MissingParamError('field'));
        jest.spyOn(validations[1], 'validate').mockImplementationOnce(() => new InvalidParamError('field'));
        const input = { field: faker.random.word() };
        const error = sut.validate(input);
        expect(error).toEqual(new MissingParamError('field'));
    });
    it ('Deve retornar undefine caso nenhuma validação falhe', () => {
        const { sut } = makeSut();
        const input = { field: faker.random.word() };
        const error = sut.validate(input);
        expect(error).toBeFalsy;
    });
});