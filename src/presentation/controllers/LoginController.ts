import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";
import { badRequest } from "@/presentation/helpers/http";
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
        await this.authentication.auth(httpRequest.body);
        return {
            statusCode: 200,
            body: null
        };
    }
}