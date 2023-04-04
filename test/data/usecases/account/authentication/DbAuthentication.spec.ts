import { faker } from "@faker-js/faker";
import { AuthenticationParams } from "@/domain/usercases/account";
import { DbAuthentication } from "@/data/usecases/account/DbAuthentication";
import { LoadAccountByEmailRepositorySpy } from "@/data/test";

describe('DbAuthentication', () => {
    it ('Deve chamar LoadAccountByEmailRepository com o email correto', async () => {
        const loadAccountByEmailRepository = new LoadAccountByEmailRepositorySpy(); 
        const sut = new DbAuthentication(loadAccountByEmailRepository);
        const input: AuthenticationParams = {
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        await sut.auth(input);
        expect(loadAccountByEmailRepository.emailParam).toBe(input.email);
    });
});