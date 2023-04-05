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
    codigoAmostra: "02383322",
    cocaina: 0.5,
    anfetamina: 0.1,
    metanfetamina: 0.1,
    mda: 0.1,
    mdma: 0,
    thc: 0.01,
    morfina: 0.01,
    codeina: 0.01,
    heroina: 0.01,
    benzoilecgonina: 0,
    cocaetileno: 0,
    norcocaina: 0
});
const makeSampleCutOff = (): SampleCutOffScore => ({
    id: 1,
    cocaina: 0.5,
    anfetamina: 0.1,
    metanfetamina: 0.1,
    mda: 0.1,
    mdma: 0.02,
    thc: 0.05,
    morfina: 0.05,
    codeina: 0.02,
    heroina: 0.02
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
            morfina: 0.06,
            heroina: 0
        };
        const result = sut.calculate(sampleAnalyze, makeSampleCutOff());
        expect(result).toBe("positivo");
    });
    it ('Deve retornar negativo caso cocaína esteja com um valor maior do que o permitido, mas com: Benzoilecgonina, Cocaetileno ou Norcocaína com valores menores que 0.05', () => {
        const { sut } = makeSut();
        const sampleAnalyze = {
            ...makeSampleAnalyze(),
            cocaina: 0.51
        };
        const result = sut.calculate(sampleAnalyze, makeSampleCutOff());
        expect(result).toBe("negativo");
    });
    it ('Deve retornar positivo caso cocaína esteja com um valor maior do que o permitido e Benzoilecgonina igual ou maior a 0.05', () => {
        const { sut } = makeSut();
        const sampleAnalyze = {
            ...makeSampleAnalyze(),
            cocaina: 0.51,
            benzoilecgonina: 0.05
        };
        const result = sut.calculate(sampleAnalyze, makeSampleCutOff());
        expect(result).toBe("positivo");
    });
    it ('Deve retornar positivo caso cocaína esteja com um valor maior do que o permitido e Cocaetileno igual ou maior a 0.05', () => {
        const { sut } = makeSut();
        const sampleAnalyze = {
            ...makeSampleAnalyze(),
            cocaina: 0.51,
            cocaetileno: 0.05
        };
        const result = sut.calculate(sampleAnalyze, makeSampleCutOff());
        expect(result).toBe("positivo");
    });
    it ('Deve retornar positivo caso cocaína esteja com um valor maior do que o permitido e Norcocaína igual ou maior a 0.05', () => {
        const { sut } = makeSut();
        const sampleAnalyze = {
            ...makeSampleAnalyze(),
            cocaina: 0.51,
            norcocaina: 0.05
        };
        const result = sut.calculate(sampleAnalyze, makeSampleCutOff());
        expect(result).toBe("positivo");
    });
})