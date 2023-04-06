import { GetHistoricalSamples } from "@/domain/usercases/sample/GetHistoricalSamples";
import { ok, serverError } from "@/presentation/helpers/http";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";

export class GetSamplesController implements Controller {
    constructor(
        private readonly getHistoricalSamples: GetHistoricalSamples
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const historicals = await this.getHistoricalSamples.getHistorical(httpRequest.params);
            return ok(historicals);
        } catch (error) {
            return serverError(error);
        }
    }
}