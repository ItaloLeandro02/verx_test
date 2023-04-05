import { LoadSampleCutOffScoreRepository } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { SampleAnalysis, SampleAnalyzeParams, SampleAnalyzeResult } from "@/domain/usercases/sample";

export class DbSampleAnalysis implements SampleAnalysis {
    constructor(
        private readonly loadSampleCutOffScoreRepository: LoadSampleCutOffScoreRepository
    ) {}
    async analyze(sampleAnalyzeParams: SampleAnalyzeParams): Promise<SampleAnalyzeResult> {
        await this.loadSampleCutOffScoreRepository.loadSampleCutOffScore();
        return Promise.resolve({
            codigo_amostra: sampleAnalyzeParams.codigo_amostra,
            result: "negativo"
        });
    }
}