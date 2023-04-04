import { faker } from "@faker-js/faker";
import { MissingParamError } from "@/presentation/errors";
import { RequiredFieldValidation } from "@/validation/validators/RequiredFieldValidation";

describe('RequiredFieldValidation', () => {
    it ('Deve retornar MissingParamError caso a validação falhe', () => {
        const sut = new RequiredFieldValidation('field');
        const input = { name: faker.name.fullName() };
        const error = sut.validate(input);
        expect(error).toEqual(new MissingParamError('field'));
    });
});