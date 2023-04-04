import { LoginController } from "@/presentation/controllers/LoginController";
import { MissingError } from "@/presentation/errors";
import { HttpRequest } from "@/presentation/protocols";

describe('LoginController', () => {
    it ('Deve retornar 400 caso o e-mail não seja informado', async () => {
        const sut = new LoginController();
        const httpRequest: HttpRequest = {};
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual({
            statusCode: 400,
            body: new MissingError('email')
        });
    });
});