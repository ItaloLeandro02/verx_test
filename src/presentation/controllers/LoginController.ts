import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { MissingParamError } from "@/presentation/errors";
import { badRequest } from "@/presentation/helpers/http";

export class LoginController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { email, password } = httpRequest.body;
        if (!email) {
            return badRequest(new MissingParamError('email'));
        }
        if (!password) {
            return badRequest(new MissingParamError('password'));
        }
        return {
            statusCode: 200,
            body: null
        };
    }
}