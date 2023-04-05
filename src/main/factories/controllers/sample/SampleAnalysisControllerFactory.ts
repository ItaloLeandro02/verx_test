import { SampleAnalysisController } from "@/presentation/controllers/sample/SampleAnalysisController";
import { Controller } from "@/presentation/protocols";
import { makeSampleAnalysisValidation } from "./SampleAnalysisValidationFactory";
import { DbSampleAnalysis } from "@/data/usecases/sample/DbSampleAnalysis";
import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";
import { SampleKnexRepository } from "@/infra/db/knex/sample/SampleKnexRepository";
import { AppCalculateSampleResult } from "@/utils/AppCalculateSampleResult";

export const makeSampleAnalysisController = (): Controller => {
    const validation = makeSampleAnalysisValidation();
    const connection = KnexHelper.connection;
    const sampleKnexRepository = new SampleKnexRepository(connection); 
    const appSampleCalculate = new AppCalculateSampleResult();
    const sampleAnalysis = new DbSampleAnalysis(sampleKnexRepository, appSampleCalculate, sampleKnexRepository);
    return new SampleAnalysisController(validation, sampleAnalysis);
}