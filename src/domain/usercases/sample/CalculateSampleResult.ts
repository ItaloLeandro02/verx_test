import { SampleCutOffScore } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { SampleAnalyzeParams } from "@/domain/usercases/sample/SampleAnalysis";

export interface CalculateSampleResult {
    calculate (sampleAnalyze: SampleAnalyzeParams, sampleCutOff: SampleCutOffScore): Promise<"positivo" | "negativo">;
}