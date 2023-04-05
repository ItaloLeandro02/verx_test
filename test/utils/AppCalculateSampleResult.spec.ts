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
const makeAmpleAnalyze = (): SampleAnalyzeParams => ({
    "codigo_amostra": "02383322",
    "Cocaína": 0.678,
    "Anfetamina": 0.1,
    "Metanfetamina": 0.1,
    "MDA": 0.1,
    "MDMA": 0,
    "THC": 0.1,
    "Morfina": 0.1,
    "Codeína": 0.1,
    "Heroína": 0.1,
    "Benzoilecgonina": 0,
    "Cocaetileno": 0,
    "Norcocaína": 0
});
const makeSampleCutOff = (): SampleCutOffScore => ({
    "Cocaína": 0.5,
    "Anfetamina": 0.2,
    "Metanfetamina": 0.2,
    "MDA": 0.2,
    "MDMA": 0.2,
    "THC": 0.05,
    "Morfina": 0.2,
    "Codeína": 0.2,
    "Heroína": 0.2    
}); 

describe('AppCalculateSampleResult', () => {
    it ('Deve retornar negativo caso nenhuma droga seja maior do que a nota de corte', () => {
        const { sut } = makeSut();
        const result = sut.calculate(makeAmpleAnalyze(), makeSampleCutOff());
        expect(result).toBe("negativo");
    });
})