import { GetHistoricalSamples, GetHistoricalSamplesParams, HistoricalSample } from "@/domain/usercases/sample/GetHistoricalSamples";

export class GetHistoricalSamplesSpy implements GetHistoricalSamples {
    requestParams: GetHistoricalSamplesParams = null as unknown as GetHistoricalSamplesParams;
    mockHistoricalSample: HistoricalSample[] = [
        {
            id: 1,
            codigoAmostra: "02383322",
            cocaina: 0.678,
            anfetamina: 0.1,
            metanfetamina: 0.1,
            mda: 0.1,
            mdma: 0,
            thc: 0.1,
            morfina: 0.1,
            codeina: 0.1,
            heroina: 0.1,
            benzoilecgonina: 0,
            cocaetileno: 0,
            norcocaina: 0,
            result: "positivo"
        }
    ]
    async getHistorical(params: GetHistoricalSamplesParams): Promise<HistoricalSample[]> {
        this.requestParams = params;
        return Promise.resolve(this.mockHistoricalSample);
    }
}