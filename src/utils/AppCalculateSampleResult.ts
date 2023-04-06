import { SampleCutOffScore } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { CalculateSampleResult, SampleAnalyzeParams } from "@/domain/usercases/sample";

export class AppCalculateSampleResult implements CalculateSampleResult {
    calculate(sampleAnalyze: SampleAnalyzeParams, sampleCutOff: SampleCutOffScore): "positivo" | "negativo" {
        let result = false;
        const itemsCutOff = Object.entries(sampleCutOff);
        for (const item of itemsCutOff) {
            const itemCode = item[0]; 
            const itemCutOffScore = item[1]; 
            const drugValue = parseFloat(sampleAnalyze[itemCode as keyof SampleAnalyzeParams]); 
            const isAllowed = drugValue > itemCutOffScore;
            if (isAllowed && (itemCode !== 'cocaina' || this.verifyCocainaCase(sampleAnalyze))) {
                result = isAllowed;
                break;
            }
        }
        return result ? "positivo" : "negativo";
    }
    private verifyCocainaCase(sampleAnalyze: SampleAnalyzeParams): boolean {
        const drugsToVerify = ['benzoilecgonina', 'cocaetileno', 'norcocaina'];
        return drugsToVerify.some(drugCode => {
            const sampleDrugValue = parseFloat(sampleAnalyze[drugCode as keyof SampleAnalyzeParams]); 
            return sampleDrugValue >= 0.05
        });
    }
}