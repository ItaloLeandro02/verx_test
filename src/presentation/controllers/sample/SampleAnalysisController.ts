import { SampleAnalysis } from "@/domain/usercases/sample";
import { badRequest, ok, serverError } from "@/presentation/helpers/http";
import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";

export class SampleAnalysisController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly sampleAnalysis: SampleAnalysis
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
       try {
            const error = this.validation.validate(httpRequest.body);
            if (error) {
                return badRequest(error);
            }
            await this.sampleAnalysis.analyze(httpRequest.body);
            return Promise.resolve(ok());
       } catch (error) {
            return serverError(error);
       }
    }
}