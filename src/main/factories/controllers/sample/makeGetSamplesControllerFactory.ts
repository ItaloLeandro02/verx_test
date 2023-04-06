import { DbGetHistoricalSamples } from "@/data/usecases/sample/DbGetHistoricalSamples";
import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";
import { SampleKnexRepository } from "@/infra/db/knex/sample/SampleKnexRepository";
import { GetSamplesController } from "@/presentation/controllers/sample/GetSamplesController";
import { PaginationHelper } from "@/presentation/helpers/pagination/PaginationHelper";
import { Controller } from "@/presentation/protocols";

export const makeGetSamplesController = (): Controller => {
    const pagination = new PaginationHelper();
    const connection = KnexHelper.connection;
    const repository = new SampleKnexRepository(connection);
    const getHistoricalSamples = new DbGetHistoricalSamples(pagination, repository);
    return new GetSamplesController(getHistoricalSamples); 
};