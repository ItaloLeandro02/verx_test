import { SampleAnalysis, SampleAnalyzeParams, SampleAnalyzeResult } from "@/domain/usercases/sample";

export class SampleAnalysisSpy implements SampleAnalysis {
    requestParams: SampleAnalyzeParams = null as unknown as SampleAnalyzeParams;
    analyseResult: "positivo" | "negativo" = "negativo"; 

    async analyze(sampleAnalyzeParams: SampleAnalyzeParams): Promise<SampleAnalyzeResult> {
        this.requestParams = sampleAnalyzeParams;
        return Promise.resolve({
            codigo_amostra: sampleAnalyzeParams.codigo_amostra,
            result: this.analyseResult
        });
    }
}