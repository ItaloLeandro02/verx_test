import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { MissingError } from "../errors";
import { badRequest } from "../helpers/http";

export class LoginController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { email, password } = httpRequest.body;
        if (!email) {
            return badRequest(new MissingError('email'));
        }
        if (!password) {
            return badRequest(new MissingError('password'));
        }
        return {
            statusCode: 200,
            body: null
        };
    }
}