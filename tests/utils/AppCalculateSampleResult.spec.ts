import { AppCalculateSampleResult } from "@/utils/AppCalculateSampleResult";
import { mockSampleAnalyzeParams, mockSampleCutOffData } from "@/utils/TestHelper";

type SutTypes = {
    sut: AppCalculateSampleResult
};

const makeSut = (): SutTypes => {
    const sut = new AppCalculateSampleResult();
    return {
        sut
    };
};


describe('AppCalculateSampleResult', () => {
    it ('Deve retornar negativo caso nenhuma droga seja maior do que a nota de corte', () => {
        const { sut } = makeSut();
        const result = sut.calculate(mockSampleAnalyzeParams(), mockSampleCutOffData());
        expect(result).toBe("negativo");
    });
    it ('Deve retornar positivo caso algum droga seja maior do que a nota de corte', () => {
        const { sut } = makeSut();
        const sampleAnalyze = {
            ...mockSampleAnalyzeParams(),
            morfina: "0.06",
            heroina: "0"
        };
        const result = sut.calculate(sampleAnalyze, mockSampleCutOffData());
        expect(result).toBe("positivo");
    });
    it ('Deve retornar negativo caso cocaína esteja com um valor maior do que o permitido, mas com: Benzoilecgonina, Cocaetileno ou Norcocaína com valores menores que "0.05"', () => {
        const { sut } = makeSut();
        const sampleAnalyze = {
            ...mockSampleAnalyzeParams(),
            cocaina: "0.51"
        };
        const result = sut.calculate(sampleAnalyze, mockSampleCutOffData());
        expect(result).toBe("negativo");
    });
    it ('Deve retornar positivo caso cocaína esteja com um valor maior do que o permitido e Benzoilecgonina igual ou maior a "0.05"', () => {
        const { sut } = makeSut();
        const sampleAnalyze = {
            ...mockSampleAnalyzeParams(),
            cocaina: "0.51",
            benzoilecgonina: "0.05"
        };
        const result = sut.calculate(sampleAnalyze, mockSampleCutOffData());
        expect(result).toBe("positivo");
    });
    it ('Deve retornar positivo caso cocaína esteja com um valor maior do que o permitido e Cocaetileno igual ou maior a "0.05"', () => {
        const { sut } = makeSut();
        const sampleAnalyze = {
            ...mockSampleAnalyzeParams(),
            cocaina: "0.51",
            cocaetileno: "0.05"
        };
        const result = sut.calculate(sampleAnalyze, mockSampleCutOffData());
        expect(result).toBe("positivo");
    });
    it ('Deve retornar positivo caso cocaína esteja com um valor maior do que o permitido e Norcocaína igual ou maior a "0.05"', () => {
        const { sut } = makeSut();
        const sampleAnalyze = {
            ...mockSampleAnalyzeParams(),
            cocaina: "0.51",
            norcocaina: "0.05"
        };
        const result = sut.calculate(sampleAnalyze, mockSampleCutOffData());
        expect(result).toBe("positivo");
    });
})