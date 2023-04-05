import { AccessDeniedError } from "@/presentation/errors";
import { forbidden } from "@/presentation/helpers/http";
import { AuthMiddleware } from "@/presentation/middlewares";
import { HttpRequest } from "@/presentation/protocols";
import { LoadAccountByTokenSpy } from "@/presentation/test";
import { faker } from "@faker-js/faker";

type SutTypes = {
    sut: AuthMiddleware,
    loadAccountByToken: LoadAccountByTokenSpy
};
const makeSut = (): SutTypes => {
    const loadAccountByToken = new LoadAccountByTokenSpy();
    const sut = new AuthMiddleware(loadAccountByToken);
    return {
        sut,
        loadAccountByToken
    };
};
const mockRequest = (): HttpRequest => ({
    headers: {
      'x-access-token': faker.random.word()
    }
});

describe('Auth Middleware', () => {
    it ('Deve retornar 403 caso x-access-token não esteja presente no headers', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle({});
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });
    describe('LoadAccountByToken', () => {
        it ('Deve chamar LoadAccountByToken com os valores corretos', async () => {
            const { sut, loadAccountByToken } = makeSut();
            const httpRequest = mockRequest();
            await sut.handle(httpRequest);
            expect(loadAccountByToken.acessTokenParam).toEqual(httpRequest.headers['x-access-token']);
        });
        it ('Deve retornar 403 caso LoadAccountByToken retorne undefined', async () => {
            const { sut, loadAccountByToken } = makeSut();
            loadAccountByToken.mockAccountModel = undefined;
            const httpResponse = await sut.handle({});
            expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
        });
    });
});