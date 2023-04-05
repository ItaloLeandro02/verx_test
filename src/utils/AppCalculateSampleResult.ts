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
            if (typeof drugValue === 'number') {
                const isAllowed = drugValue > itemCutOffScore;
                if (isAllowed && (itemCode !== 'Cocaína' || this.verifyCocainaCase(sampleAnalyze))) {
                    result = isAllowed;
                    break;
                }
            }
        }
        return result ? "positivo" : "negativo";
    }
    private verifyCocainaCase(sampleAnalyze: SampleAnalyzeParams): boolean {
        const drugsToVerify = ['Benzoilecgonina', 'Cocaetileno', 'Norcocaína'];
        return drugsToVerify.some(drugCode => {
            const sampleDrugValue = sampleAnalyze[drugCode as keyof SampleAnalyzeParams]; 
            if (typeof sampleDrugValue === 'number') {
                return sampleDrugValue >= 0.05
            }
        });
    }
}