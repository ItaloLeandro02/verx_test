import { SaveSampleParams, SaveSampleRepository } from "@/data/protocols/db/sample/SaveSampleRepository";

export class SaveSampleRepositorySpy implements SaveSampleRepository {
    sampleResultParams: "positivo" | "negativo" = null as unknown as "positivo" | "negativo";
    sampleAnalyzeParams: SaveSampleParams = null as unknown as SaveSampleParams;

    async saveSample(saveSample: SaveSampleParams, sampleResult: "positivo" | "negativo"): Promise<void> {
        this.sampleAnalyzeParams = saveSample;
        this.sampleResultParams = sampleResult;
        await Promise.resolve();
    }
}