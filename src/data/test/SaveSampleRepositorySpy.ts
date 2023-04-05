import { SaveSampleRepository } from "@/data/protocols/db/sample/SaveSampleRepository";
import { SampleAnalyzeParams } from "@/domain/usercases/sample";

export class SaveSampleRepositorySpy implements SaveSampleRepository {
    sampleResultParams: "positivo" | "negativo" = null as unknown as "positivo" | "negativo";
    sampleAnalyzeParams: SampleAnalyzeParams = null as unknown as SampleAnalyzeParams;

    async saveSample(saveSample: SampleAnalyzeParams, sampleResult: "positivo" | "negativo"): Promise<void> {
        this.sampleAnalyzeParams = saveSample;
        this.sampleResultParams = sampleResult;
        await Promise.resolve();
    }
}