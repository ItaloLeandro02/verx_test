import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { MissingError } from "../errors";

export class LoginController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return {
            statusCode: 400,
            body: new MissingError('email')
        }
    }
}