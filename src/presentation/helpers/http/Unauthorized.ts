import { UnauthorizedError } from "@/presentation/errors";
import { HttpResponse } from "@/presentation/protocols";

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError()
});