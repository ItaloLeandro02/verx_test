import { LoadSampleCutOffScoreRepository } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { SaveSampleRepository } from "@/data/protocols/db/sample/SaveSampleRepository";
import { CalculateSampleResult, SampleAnalysis, SampleAnalyzeParams, SampleAnalyzeResult } from "@/domain/usercases/sample";
import { convertSampleParamsToSaveDatabase } from "@/utils/ConvertSampleParamsToSaveDatabase";

export class DbSampleAnalysis implements SampleAnalysis {
    constructor(
        private readonly loadSampleCutOffScoreRepository: LoadSampleCutOffScoreRepository,
        private readonly calculateSampleResult: CalculateSampleResult,
        private readonly saveSampleRepository: SaveSampleRepository
    ) {}
    async analyze(sampleAnalyzeParams: SampleAnalyzeParams): Promise<SampleAnalyzeResult> {
        const sampleCuttOff = await this.loadSampleCutOffScoreRepository.loadSampleCutOffScore();
        const result = this.calculateSampleResult.calculate(sampleAnalyzeParams, sampleCuttOff);
        const saveSampleParams = convertSampleParamsToSaveDatabase(sampleAnalyzeParams);
        await this.saveSampleRepository.saveSample(saveSampleParams, result);
        return {
            codigoAmostra: sampleAnalyzeParams.codigoAmostra,
            result
        };
    }
}