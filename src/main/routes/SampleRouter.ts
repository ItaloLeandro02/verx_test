import { Router, Request, Response, NextFunction } from "express";
import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter";
import { makeSampleAnalysisController } from "@/main/factories/controllers/sample/SampleAnalysisControllerFactory";
import { HttpRequest } from "@/presentation/protocols";
import { AuthMiddleware } from "@/presentation/middlewares";
import { DbLoadAccountByToken } from "@/data/usecases/account/DbLoadAccountByToken";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter/JwtAdapter";
import env from "@/main/config/env";
import { AccountKnexRepository } from "@/infra/db/knex/account/AccountKnexRepository";
import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";

export default (router: Router): void => {
    router.post('/sample-analysis', 
    async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: HttpRequest = {
            headers: req.headers
        };
        const decrypter = new JwtAdapter(env.jwtSecret);
        const connection = KnexHelper.connection;
        const repository = new AccountKnexRepository(connection);
        const dbLoadAccountByToken = new DbLoadAccountByToken(decrypter, repository);
        const middleware = new AuthMiddleware(dbLoadAccountByToken);
        const httpResponse = await middleware.handle(httpRequest);
        if (httpResponse.statusCode === 200) {
            next();
        }
        res.status(httpResponse.statusCode).json({
            error: httpResponse.body.message
        });
    }, 
    adaptRoute(makeSampleAnalysisController()));
}