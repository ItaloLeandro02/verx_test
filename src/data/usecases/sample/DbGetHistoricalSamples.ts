import { GetHistoricalSamples, GetHistoricalSamplesParams, HistoricalSample } from "@/domain/usercases/sample/GetHistoricalSamples";
import { Pagination } from "@/presentation/protocols";

export class DbGetHistoricalSamples implements GetHistoricalSamples {
    constructor(
        private readonly pagination: Pagination
    ) {}

    async getHistorical(params: GetHistoricalSamplesParams): Promise<HistoricalSample[]> {
        this.pagination.getPaginationInfo(params);
        return Promise.resolve([]);
    }
}