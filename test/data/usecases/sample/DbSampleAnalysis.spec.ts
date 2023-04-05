import { CalculateSampleResultSpy, LoadSampleCutOffScoreRepositorySpy, SaveSampleRepositorySpy } from "@/data/test";
import { DbSampleAnalysis } from "@/data/usecases/sample/DbSampleAnalysis";
import { SampleAnalyzeParams } from "@/domain/usercases/sample";

type SutTypes = { 
    sut: DbSampleAnalysis,
    loadSampleCutOffScoreRepository: LoadSampleCutOffScoreRepositorySpy,
    calculateSampleResult: CalculateSampleResultSpy,
    saveSampleRepository: SaveSampleRepositorySpy
};

const makeSut = (): SutTypes => {
    const loadSampleCutOffScoreRepository = new LoadSampleCutOffScoreRepositorySpy(); 
    const calculateSampleResult = new CalculateSampleResultSpy(); 
    const saveSampleRepository = new SaveSampleRepositorySpy(); 
    const sut = new DbSampleAnalysis(loadSampleCutOffScoreRepository, calculateSampleResult, saveSampleRepository);
    return {
        sut,
        loadSampleCutOffScoreRepository,
        calculateSampleResult, 
        saveSampleRepository
    }
};
const mockInput = (): SampleAnalyzeParams => ({
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

describe('DbSampleAnalysis', () => {
    describe('LoadSampleCutOffScoreRepository', () => {
        it ('Deve chamar LoadSampleCutOffScoreRepository', async () => {
            const { sut, loadSampleCutOffScoreRepository } = makeSut();
            const loadSampleCutOffScoreRepositorySpy = jest.spyOn(loadSampleCutOffScoreRepository, 'loadSampleCutOffScore');
            const input = mockInput();
            await sut.analyze(input);
            expect(loadSampleCutOffScoreRepositorySpy).toHaveBeenCalledTimes(1);
        });
        it ('Deve retornar uma exceção caso LoadSampleCutOffScoreRepository falhe', async () => {
            const { sut, loadSampleCutOffScoreRepository } = makeSut();
            jest.spyOn(loadSampleCutOffScoreRepository, 'loadSampleCutOffScore').mockImplementationOnce(() => { throw new Error() });
            const input = mockInput();
            const promise = sut.analyze(input);
            await expect(promise).rejects.toThrow();
        });
    });
    describe('CalculateSampleResult', () => {
        it ('Deve chamar CalculateSampleResult com os valores corretos', async () => {
            const { sut, calculateSampleResult, loadSampleCutOffScoreRepository } = makeSut();
            const input = mockInput();
            await sut.analyze(input);
            expect(calculateSampleResult.sampleCutOffParams).toEqual(loadSampleCutOffScoreRepository.mockSampleCutOffResult);
            expect(calculateSampleResult.sampleAnalyzeParams).toEqual(input);
        });
        it ('Deve retornar uma exceção caso CalculateSampleResult falhe', async () => {
            const { sut, calculateSampleResult } = makeSut();
            jest.spyOn(calculateSampleResult, 'calculate').mockImplementationOnce(() => { throw new Error() });
            const input = mockInput();
            const promise = sut.analyze(input);
            await expect(promise).rejects.toThrow();
        });
    });
    describe('SaveSampleRepository', () => {
        it ('Deve chamar SaveSampleRepository com os valores corretos', async () => {
            const { sut, calculateSampleResult, saveSampleRepository } = makeSut();
            const input = mockInput();
            await sut.analyze(input);
            expect(saveSampleRepository.sampleResultParams).toEqual(calculateSampleResult.mockResult);
            expect(saveSampleRepository.sampleAnalyzeParams).toEqual(input);
        });
    });
});