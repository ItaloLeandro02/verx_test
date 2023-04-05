import { SampleCutOffScore } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { CalculateSampleResult, SampleAnalyzeParams } from "@/domain/usercases/sample";

export class AppCalculateSampleResult implements CalculateSampleResult {
    calculate(sampleAnalyze: SampleAnalyzeParams, sampleCutOff: SampleCutOffScore): "positivo" | "negativo" {
        return "negativo";
    }
}