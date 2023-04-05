import { LoadSampleCutOffScoreRepository } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { SaveSampleRepository } from "@/data/protocols/db/sample/SaveSampleRepository";
import { CalculateSampleResult, SampleAnalysis, SampleAnalyzeParams, SampleAnalyzeResult } from "@/domain/usercases/sample";

export class DbSampleAnalysis implements SampleAnalysis {
    constructor(
        private readonly loadSampleCutOffScoreRepository: LoadSampleCutOffScoreRepository,
        private readonly calculateSampleResult: CalculateSampleResult,
        private readonly saveSampleRepository: SaveSampleRepository
    ) {}
    async analyze(sampleAnalyzeParams: SampleAnalyzeParams): Promise<SampleAnalyzeResult> {
        const sampleCuttOff = await this.loadSampleCutOffScoreRepository.loadSampleCutOffScore();
        const result = await this.calculateSampleResult.calculate(sampleAnalyzeParams, sampleCuttOff);
        await this.saveSampleRepository.saveSample(sampleAnalyzeParams, result);
        return {
            codigo_amostra: sampleAnalyzeParams.codigo_amostra,
            result
        };
    }
}