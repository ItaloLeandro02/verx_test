import { SampleCutOffScore } from "@/data/protocols/db/sample/LoadSampleCutOffScoreRepository";
import { SampleAnalyzeParams } from "@/domain/usercases/sample";
import { AppCalculateSampleResult } from "@/utils/AppCalculateSampleResult";

type SutTypes = {
    sut: AppCalculateSampleResult
};

const makeSut = (): SutTypes => {
    const sut = new AppCalculateSampleResult();
    return {
        sut
    };
};
const makeSampleAnalyze = (): SampleAnalyzeParams => ({
    "codigo_amostra": "02383322",
    "Cocaína": 0.5,
    "Anfetamina": 0.1,
    "Metanfetamina": 0.1,
    "MDA": 0.1,
    "MDMA": 0,
    "THC": 0.01,
    "Morfina": 0.01,
    "Codeína": 0.01,
    "Heroína": 0.01,
    "Benzoilecgonina": 0,
    "Cocaetileno": 0,
    "Norcocaína": 0
});
const makeSampleCutOff = (): SampleCutOffScore => ({
    "Cocaína": 0.5,
    "Anfetamina": 0.1,
    "Metanfetamina": 0.1,
    "MDA": 0.1,
    "MDMA": 0.02,
    "THC": 0.05,
    "Morfina": 0.05,
    "Codeína": 0.02,
    "Heroína": 0.02    
}); 

describe('AppCalculateSampleResult', () => {
    it ('Deve retornar negativo caso nenhuma droga seja maior do que a nota de corte', () => {
        const { sut } = makeSut();
        const result = sut.calculate(makeSampleAnalyze(), makeSampleCutOff());
        expect(result).toBe("negativo");
    });
    it ('Deve retornar positivo caso algum droga seja maior do que a nota de corte', () => {
        const { sut } = makeSut();
        const sampleAnalyze = {
            ...makeSampleAnalyze(),
            "Morfina": 0.06,
            "Heroína": 0
        };
        const result = sut.calculate(sampleAnalyze, makeSampleCutOff());
        expect(result).toBe("positivo");
    });
})