import { HistoricalSample } from "@/domain/usercases/sample/GetHistoricalSamples";

export type LoadHistoricalsSampleRepositoryParams = {
    limit: number,
    offset: number
};

export interface LoadHistoricalsSampleRepository {
    loadHistoricals (params: LoadHistoricalsSampleRepositoryParams): Promise<HistoricalSample[]>;
}