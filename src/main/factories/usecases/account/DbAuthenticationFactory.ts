import { DbAuthentication } from "@/data/usecases/account/DbAuthentication";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter/BcryptAdapter";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/JwtAdapter";
import { AccountKnexRepository } from "@/infra/db/knex/account/AccountKnexRepository";
import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";
import env from "@/main/config/env";

export const makeAuthentication = (): DbAuthentication => {
    const accountKnexRepository = new AccountKnexRepository(KnexHelper.connection);
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    return new DbAuthentication(accountKnexRepository, bcryptAdapter, jwtAdapter, accountKnexRepository);
};