import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";
import { badRequest, unauthorized } from "@/presentation/helpers/http";
import { Authentication } from "@/domain/usercases";

export class LoginController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly authentication: Authentication
    ) {}
    
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const error = this.validation.validate(httpRequest.body);
        if (error) {
            return badRequest(error);
        }
        const token = await this.authentication.auth(httpRequest.body);
        if (!token) {
            return unauthorized();
        }
        return {
            statusCode: 200,
            body: null
        };
    }
}