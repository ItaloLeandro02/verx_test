import { HttpRequest, HttpResponse, Middleware } from "@/presentation/protocols";
import { forbidden, serverError } from "@/presentation/helpers/http";
import { AccessDeniedError } from "@/presentation/errors";
import { LoadAccountByToken } from "@/domain/usercases/account";

export class AuthMiddleware implements Middleware {
    constructor(
        private readonly loadAccountByToken: LoadAccountByToken
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const accessToken = httpRequest.headers?.['x-access-token'];
            if (accessToken) {
                await this.loadAccountByToken.load(accessToken);
            } 
            return forbidden(new AccessDeniedError());
        } catch (error) {
            return serverError(error);
        }
    }
}