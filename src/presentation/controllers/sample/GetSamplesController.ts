import { GetHistoricalSamples } from "@/domain/usercases/sample/GetHistoricalSamples";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";

export class GetSamplesController implements Controller {
    constructor(
        private readonly getHistoricalSamples: GetHistoricalSamples
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        await this.getHistoricalSamples.getHistorical(httpRequest.params);
        return Promise.resolve(null as unknown as HttpResponse);
    }
}