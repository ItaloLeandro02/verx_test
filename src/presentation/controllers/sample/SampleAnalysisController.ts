import { ok } from "@/presentation/helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";

export class SampleAnalysisController implements Controller {
    constructor (
        private readonly validation: Validation
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        this.validation.validate(httpRequest.body);
        return Promise.resolve(ok());
    }
}