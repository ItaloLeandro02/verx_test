import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";
import { badRequest } from "@/presentation/helpers/http";

export class LoginController implements Controller {
    constructor(private readonly validation: Validation) {}
    
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const error = this.validation.validate(httpRequest.body);
        if (error) {
            return badRequest(error);
        }
        return {
            statusCode: 200,
            body: null
        };
    }
}