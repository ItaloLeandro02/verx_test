import { faker } from '@faker-js/faker';
import { LoginController } from "@/presentation/controllers/LoginController";
import { MissingError } from "@/presentation/errors";
import { HttpRequest } from "@/presentation/protocols";
import { badRequest } from '@/presentation/helpers/http';

type SutTypes = {
    sut: LoginController
};

const makeSut = (): SutTypes => {
    const sut = new LoginController();
    return {
        sut
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
    it ('Deve retornar 400 caso o e-mail não seja informado', async () => {
        const { sut } = makeSut();
        const httpRequest = makeHttpRequest();
        delete httpRequest.body.email;
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest(new MissingError('email')));
    });

    it ('Deve retornar 400 caso a senha não seja informada', async () => {
        const { sut } = makeSut();
        const httpRequest = makeHttpRequest();
        delete httpRequest.body.password;
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest(new MissingError('password')));
    });
});