import { LoadHistoricalsSampleRepository } from "@/data/protocols/db/sample/LoadHistoricalsSampleRepository";
import { GetHistoricalSamples, GetHistoricalSamplesParams, HistoricalSample } from "@/domain/usercases/sample/GetHistoricalSamples";
import { Pagination } from "@/presentation/protocols";

export class DbGetHistoricalSamples implements GetHistoricalSamples {
    constructor(
        private readonly pagination: Pagination,
        private readonly loadHistoricalsSampleRepository: LoadHistoricalsSampleRepository
    ) {}

    async getHistorical(params: GetHistoricalSamplesParams): Promise<HistoricalSample[]> {
        const paginationInfo = this.pagination.getPaginationInfo(params);
        const historicals = await this.loadHistoricalsSampleRepository.loadHistoricals(paginationInfo);
        return historicals;
    }
}