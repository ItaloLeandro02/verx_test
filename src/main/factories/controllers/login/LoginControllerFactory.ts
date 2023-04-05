import { DbAuthentication } from "@/data/usecases/account/DbAuthentication";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/BcryptAdapter";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/JwtAdapter";
import { AccountKnexRepository } from "@/infra/db/knex/account/AccountKnexRepository";
import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";
import { EmailValidatorAdapter } from "@/infra/validators/EmailValidatorAdapter";
import { LoginController } from "@/presentation/controllers/LoginController";
import { Controller, Validation } from "@/presentation/protocols";
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators";

export const makeLoginController = (): Controller => {
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
    return new LoginController(makeValidation(), makeAuthentication());
};