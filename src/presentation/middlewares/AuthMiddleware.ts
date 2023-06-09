import { HttpRequest, HttpResponse, Middleware } from "@/presentation/protocols";
import { forbidden, ok, serverError } from "@/presentation/helpers/http";
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
                const account = await this.loadAccountByToken.load(accessToken);
                if (account) {
                    return ok({ id: account.id });
                }
            } 
            return forbidden(new AccessDeniedError());
        } catch (error) {
            return serverError(error);
        }
    }
}