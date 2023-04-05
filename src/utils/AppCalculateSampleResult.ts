import { SampleCutOffScore } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { CalculateSampleResult, SampleAnalyzeParams } from "@/domain/usercases/sample";

export class AppCalculateSampleResult implements CalculateSampleResult {
    calculate(sampleAnalyze: SampleAnalyzeParams, sampleCutOff: SampleCutOffScore): "positivo" | "negativo" {
        let result = false;
        const itemsCutOff = Object.entries(sampleCutOff);
        for (const item of itemsCutOff) {
            const itemCode = item[0]; 
            const itemCutOffScore = item[1]; 
            const drugValue = sampleAnalyze[itemCode as keyof SampleAnalyzeParams]; 
            if (typeof drugValue == 'number') {
                result = drugValue > itemCutOffScore;
                if (result) {
                    break;
                }
            }
        }
        return result ? "positivo" : "negativo";
    }
}