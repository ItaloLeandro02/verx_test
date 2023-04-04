import { faker } from '@faker-js/faker';
import { LoginController } from "@/presentation/controllers/LoginController";
import { HttpRequest } from "@/presentation/protocols";
import { ValidationSpy } from '@/presentation/test';
import { badRequest } from '@/presentation/helpers/http';
import { InvalidParamError } from '@/presentation/errors';

type SutTypes = {
    sut: LoginController,
    validation: ValidationSpy
};

const makeSut = (): SutTypes => {
    const validation = new ValidationSpy();
    const sut = new LoginController(validation);
    return {
        sut,
        validation
    };
};
const makeHttpRequest = (): HttpRequest => {
    return {
        body: {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    }
}

describe('LoginController', () => {
    it ('Deve chamar Validations com os dados corretos', async () => {
        const { sut, validation } = makeSut();
        const httpRequest = makeHttpRequest();
        await sut.handle(httpRequest);
        expect(validation.inputParams).toEqual(httpRequest.body);
    });
    it ('Deve retornar 400 caso alguma validação falhe', async () => {
        const { sut, validation } = makeSut();
        jest.spyOn(validation, 'validate').mockImplementationOnce(() => new InvalidParamError('email'));
        const httpRequest = makeHttpRequest();
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
    });
});