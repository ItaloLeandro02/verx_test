import { faker } from "@faker-js/faker";
import { MissingParamError } from "@/presentation/errors";
import { RequiredFieldValidation } from "@/validation/validators/RequiredFieldValidation";

type SutTypes = {
    sut: RequiredFieldValidation
};

const makeSut = (): SutTypes => {
    const sut = new RequiredFieldValidation('field');
    return {
        sut
    };
}

describe('RequiredFieldValidation', () => {
    it ('Deve retornar MissingParamError caso a validação falhe', () => {
        const { sut } = makeSut();
        const input = { name: faker.name.fullName() };
        const error = sut.validate(input);
        expect(error).toEqual(new MissingParamError('field'));
    });
    it ('Deve retornar undefined caso a validação ocorra com sucesso', () => {
        const { sut } = makeSut();
        const input = { field: faker.internet.email() };
        const error = sut.validate(input);
        expect(error).toBeFalsy();
    });
});