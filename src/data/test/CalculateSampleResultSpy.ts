import { CalculateSampleResult, SampleAnalyzeParams } from "@/domain/usercases/sample";
import { SampleCutOffScore } from "../protocols/db/sample/LoadSampleCutOffScoreRepository";

export class CalculateSampleResultSpy implements CalculateSampleResult {
    mockResult: "positivo" | "negativo" = "negativo";
    sampleAnalyzeParams: SampleAnalyzeParams = null as unknown as SampleAnalyzeParams;
    sampleCutOffParams: SampleCutOffScore = null as unknown as SampleCutOffScore;

    calculate(sampleAnalyze: SampleAnalyzeParams, sampleCutOff: SampleCutOffScore): "positivo" | "negativo" {
        this.sampleAnalyzeParams = sampleAnalyze; 
        this.sampleCutOffParams = sampleCutOff; 
        return this.mockResult;
    }
}