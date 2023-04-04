import { faker } from '@faker-js/faker';
import { LoginController } from "@/presentation/controllers/LoginController";
import { HttpRequest } from "@/presentation/protocols";
import { AuthenticationSpy, ValidationSpy } from '@/presentation/test';
import { badRequest, serverError, unauthorized } from '@/presentation/helpers/http';
import { InvalidParamError } from '@/presentation/errors';

type SutTypes = {
    sut: LoginController,
    validation: ValidationSpy,
    authentication: AuthenticationSpy
};

const makeSut = (): SutTypes => {
    const validation = new ValidationSpy();
    const authentication = new AuthenticationSpy();
    const sut = new LoginController(validation, authentication);
    return {
        sut,
        validation,
        authentication
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
    describe('Validation', () => {
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
    describe('Authentication', () => {
        it ('Deve chamar Authentication com os dados corretos', async () => {
            const { sut, authentication } = makeSut();
            const httpRequest = makeHttpRequest();
            await sut.handle(httpRequest);
            expect(authentication.authenticationParams).toEqual(httpRequest.body);
        });
        it ('Deve retornar 401 caso Authentication não retorne um token', async () => {
            const { sut, authentication } = makeSut();
            authentication.token = '';
            const httpRequest = makeHttpRequest();
            const httpResponse = await sut.handle(httpRequest);
            expect(httpResponse).toEqual(unauthorized());
        });
        it ('Deve retornar 500 caso Authentication lance uma exceção', async () => {
            const { sut, authentication } = makeSut();
            jest.spyOn(authentication, 'auth').mockImplementationOnce(() => { throw new Error() });
            const httpRequest = makeHttpRequest();
            const httpResponse = await sut.handle(httpRequest);
            expect(httpResponse).toEqual(serverError(new Error()));
        });
    });
});