import { Router, Request, Response } from "express";
import { HttpRequest, Validation } from "@/presentation/protocols";
import { LoginController } from "@/presentation/controllers/LoginController";
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators";
import { EmailValidatorAdapter } from "@/infra/validators/EmailValidatorAdapter";
import { DbAuthentication } from "@/data/usecases/account/DbAuthentication";
import { AccountKnexRepository } from "@/infra/db/knex/account/AccountKnexRepository";
import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/BcryptAdapter";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/JwtAdapter";

export default (router: Router): void => {
    router.post('/login', async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers
        };
        const makeValidation = (): ValidationComposite => {
            const validations: Validation[] = [];
            const requiredFields: string[] = ['email', 'password'];
            for (const field of requiredFields) {
                validations.push(new RequiredFieldValidation(field));
            }
            validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
            return new ValidationComposite(validations);
        };
        const makeAuthentication = (): DbAuthentication => {
            const accountKnexRepository = new AccountKnexRepository(KnexHelper.connection);
            const salt = 12;
            const bcryptAdapter = new BcryptAdapter(salt);
            const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET || 'dshfjsd1');
            return new DbAuthentication(accountKnexRepository, bcryptAdapter, jwtAdapter, accountKnexRepository);
        };
        const loginController = new LoginController(makeValidation(), makeAuthentication());
        const httpResponse = await loginController.handle(httpRequest);
        res.status(httpResponse.statusCode).json(
            httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299
            ? httpResponse.body
            : { error: httpResponse.body.message }
        )
    });
}