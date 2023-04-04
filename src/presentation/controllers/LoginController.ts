import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { MissingError } from "../errors";

export class LoginController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { email, password } = httpRequest.body;
        if (!email) {
            return {
                statusCode: 400,
                body: new MissingError('email')
            }
        }
        if (!password) {
            return {
                statusCode: 400,
                body: new MissingError('password')
            }
        }
        return {
            statusCode: 200,
            body: null
        };
    }
}