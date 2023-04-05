import { Router, Request, Response } from "express";
import { HttpRequest } from "@/presentation/protocols";
import { makeLoginController } from "../factories/controllers/login/LoginControllerFactory";

export default (router: Router): void => {
    router.post('/login', async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers
        };
        const loginController = makeLoginController();
        const httpResponse = await loginController.handle(httpRequest);
        res.status(httpResponse.statusCode).json(
            httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299
            ? httpResponse.body
            : { error: httpResponse.body.message }
        )
    });
}