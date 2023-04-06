import { LoadHistoricalsSampleRepository, LoadHistoricalsSampleRepositoryParams } from "@/data/protocols/db/sample/LoadHistoricalsSampleRepository";
import { HistoricalSample } from "@/domain/usercases/sample/GetHistoricalSamples";

export class LoadHistoricalsSampleRepositorySpy implements LoadHistoricalsSampleRepository {
    requestParams: LoadHistoricalsSampleRepositoryParams = null as unknown as LoadHistoricalsSampleRepositoryParams;
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
    
    async loadHistoricals(params: LoadHistoricalsSampleRepositoryParams): Promise<HistoricalSample[]> {
        this.requestParams = params;
        return Promise.resolve(this.mockHistoricalSample);
    }
}