import { AccessDeniedError } from "@/presentation/errors";
import { forbidden } from "@/presentation/helpers/http";
import { AuthMiddleware } from "@/presentation/middlewares";

type SutTypes = {
    sut: AuthMiddleware
};
const makeSut = (): SutTypes => {
    const sut = new AuthMiddleware();
    return {
        sut
    };
}

describe('Auth Middleware', () => {
    it ('Deve retornar 403 caso x-access-token não esteja presente no headers', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle({});
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });
});