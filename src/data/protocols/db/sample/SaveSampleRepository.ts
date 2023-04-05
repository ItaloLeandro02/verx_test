import { SampleAnalyzeParams } from "@/domain/usercases/sample";

export interface SaveSampleRepository {
    saveSample (saveSample: SampleAnalyzeParams, sampleResult: "positivo" | "negativo"): Promise<void>;
}