import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";
import { badRequest, ok, serverError, unauthorized } from "@/presentation/helpers/http";
import { Authentication } from "@/domain/usercases/account";

export class LoginController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly authentication: Authentication
    ) {}
    
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body);
            if (error) {
                return badRequest(error);
            }
            const token = await this.authentication.auth(httpRequest.body);
            if (!token) {
                return unauthorized();
            }
            return ok(token);
        } catch (error) {
            return serverError(error);
        }
    }
}