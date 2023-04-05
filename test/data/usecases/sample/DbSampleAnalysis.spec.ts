import { LoadSampleCutOffScoreRepositorySpy } from "@/data/test";
import { DbSampleAnalysis } from "@/data/usecases/sample/DbSampleAnalysis";
import { SampleAnalyzeParams } from "@/domain/usercases/sample";

type SutTypes = { 
    sut: DbSampleAnalysis,
    loadSampleCutOffScoreRepository: LoadSampleCutOffScoreRepositorySpy
};

const makeSut = (): SutTypes => {
    const loadSampleCutOffScoreRepository = new LoadSampleCutOffScoreRepositorySpy(); 
    const sut = new DbSampleAnalysis(loadSampleCutOffScoreRepository);
    return {
        sut,
        loadSampleCutOffScoreRepository
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
    });
});