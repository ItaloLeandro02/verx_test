import { DbLoadAccountByToken } from "@/data/usecases/account/DbLoadAccountByToken";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/JwtAdapter";
import { AccountKnexRepository } from "@/infra/db/knex/account/AccountKnexRepository";
import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";
import env from "@/main/config/env";
import { AuthMiddleware } from "@/presentation/middlewares";
import { Middleware } from "@/presentation/protocols";

export const makeAuthMiddleware = (): Middleware => {
    const tokenCheck = new JwtAdapter(env.jwtSecret);
    const connection = KnexHelper.connection;
    const repository = new AccountKnexRepository(connection);
    const dbLoadAccountByToken = new DbLoadAccountByToken(tokenCheck, repository);
    return new AuthMiddleware(dbLoadAccountByToken);
};