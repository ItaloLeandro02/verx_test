import { CalculateSampleResult, SampleAnalyzeParams } from "@/domain/usercases/sample";
import { SampleCutOffScore } from "../protocols/db/sample/LoadSampleCutOffScoreRepository";

export class CalculateSampleResultSpy implements CalculateSampleResult {
    mockResult: "positivo" | "negativo" = "negativo";
    sampleAnalyzeParams: SampleAnalyzeParams = null as unknown as SampleAnalyzeParams;
    sampleCutOffParams: SampleCutOffScore = null as unknown as SampleCutOffScore;

    async calculate(sampleAnalyze: SampleAnalyzeParams, sampleCutOff: SampleCutOffScore): Promise<"positivo" | "negativo"> {
        this.sampleAnalyzeParams = sampleAnalyze; 
        this.sampleCutOffParams = sampleCutOff; 
        return Promise.resolve(this.mockResult);
    }
}