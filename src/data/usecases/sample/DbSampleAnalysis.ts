import { LoadSampleCutOffScoreRepository } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { CalculateSampleResult, SampleAnalysis, SampleAnalyzeParams, SampleAnalyzeResult } from "@/domain/usercases/sample";

export class DbSampleAnalysis implements SampleAnalysis {
    constructor(
        private readonly loadSampleCutOffScoreRepository: LoadSampleCutOffScoreRepository,
        private readonly calculateSampleResult: CalculateSampleResult
    ) {}
    async analyze(sampleAnalyzeParams: SampleAnalyzeParams): Promise<SampleAnalyzeResult> {
        const sampleCuttOff = await this.loadSampleCutOffScoreRepository.loadSampleCutOffScore();
        await this.calculateSampleResult.calculate(sampleAnalyzeParams, sampleCuttOff);
        return Promise.resolve({
            codigo_amostra: sampleAnalyzeParams.codigo_amostra,
            result: "negativo"
        });
    }
}