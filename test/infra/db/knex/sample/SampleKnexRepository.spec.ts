import { SampleAnalyzeParams } from "@/domain/usercases/sample";
import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";
import { SampleKnexRepository } from "@/infra/db/knex/sample/SampleKnexRepository";
import { PaginationInfo } from "@/presentation/protocols";

type SutTypes = {
    sut: SampleKnexRepository
};

const makeSut = (): SutTypes => {
    const connection = KnexHelper.connection;
    const sut = new SampleKnexRepository(connection);
    return {
        sut
    };
};

const defaultSampleCuttOffScore = {
    id: 1,
    cocaina: 0.5,
    anfetamina: 0.2,
    metanfetamina: 0.2,
    mda: 0.2,
    mdma: 0.2,
    thc: 0.05,
    morfina: 0.2,
    codeina: 0.2,
    heroina: 0.2
};

const mockSampleAnalyzeParams = (): SampleAnalyzeParams => ({
    codigoAmostra: "02383322",
    cocaina: 0.678,
    anfetamina: 0.1,
    metanfetamina: 0.1,
    mda: 0.1,
    mdma: 0,
    thc: 0.1,
    morfina: 0.1,
    codeina: 0.1,
    heroina: 0.1,
    benzoilecgonina: 0,
    cocaetileno: 0,
    norcocaina: 0
});
const insertSample = async (): Promise<void> => {
    await KnexHelper.connection('samples')
    .insert({
        codigoAmostra: "02383322",
        cocaina: 0.678,
        anfetamina: 0.1,
        metanfetamina: 0.1,
        mda: 0.1,
        mdma: 0,
        thc: 0.1,
        morfina: 0.1,
        codeina: 0.1,
        heroina: 0.1,
        benzoilecgonina: 0,
        cocaetileno: 0,
        norcocaina: 0,
        result: "positivo"
    });
};

describe('SampleKnexRepository', () => {
    beforeAll(async () => {
        await KnexHelper.connect();
        await KnexHelper.runMigrations();
        await KnexHelper.runSeeders();
    });
    afterEach(async () => {
        await KnexHelper.deleteData('samples');
    });
    afterAll(async () => {
        await KnexHelper.disconnect();
    });

    describe('LoadSampleCutOffScoreRepository', () => {
        it ('Deve retornar o sampleCuttOffScore do banco', async () => {
            const { sut } = makeSut();
            const sampleCuttOffScore = await sut.loadSampleCutOffScore();
            expect(sampleCuttOffScore).toBeTruthy();
            expect(sampleCuttOffScore).toEqual(defaultSampleCuttOffScore);
        });
    });
    describe('SaveSampleRepository', () => {
        it ('Deve persistir a amostra recebida no banco com o resultado', async () => {
            const { sut } = makeSut();
            const sampleCuttOffScore = await sut.loadSampleCutOffScore();
            expect(sampleCuttOffScore).toBeTruthy();
            const sampleAnalyze = mockSampleAnalyzeParams();
            const result = "positivo";
            await sut.saveSample(sampleAnalyze, result);
            const sampleResult = await KnexHelper.connection('samples').first().orderBy('id', 'desc');
            expect(sampleResult).toBeTruthy();
            expect(sampleResult.id).toBeTruthy();
            expect(sampleResult.result).toBe(result);
            expect(sampleResult.codigoAmostra).toBe(sampleAnalyze.codigoAmostra);
            expect(parseFloat(sampleResult.cocaina)).toBe(sampleAnalyze.cocaina);
            expect(parseFloat(sampleResult.anfetamina)).toBe(sampleAnalyze.anfetamina);
            expect(parseFloat(sampleResult.mda)).toBe(sampleAnalyze.mda);
            expect(parseFloat(sampleResult.thc)).toBe(sampleAnalyze.thc);
            expect(parseFloat(sampleResult.morfina)).toBe(sampleAnalyze.morfina);
            expect(parseFloat(sampleResult.codeina)).toBe(sampleAnalyze.codeina);
            expect(parseFloat(sampleResult.heroina)).toBe(sampleAnalyze.heroina);
            expect(parseFloat(sampleResult.benzoilecgonina)).toBe(sampleAnalyze.benzoilecgonina);
            expect(parseFloat(sampleResult.cocaetileno)).toBe(sampleAnalyze.cocaetileno);
            expect(parseFloat(sampleResult.norcocaina)).toBe(sampleAnalyze.norcocaina);
        });
    });
    describe('LoadHistoricalsSampleRepository', () => {
        it ('Deve retornar as primeiras dez consultas do banco', async () => {
            const { sut } = makeSut();
            for (const iterator of new Array(12)) {
                await insertSample();
            }
            const paginationInfo: PaginationInfo = {
                limit: 10,
                offset: 0
            };
            const historicals = await sut.loadHistoricals(paginationInfo);
            expect(historicals).toHaveLength(10);
        });
        it ('Deve retornar as duas últimas consultas do banco', async () => {
            const { sut } = makeSut();
            for (const iterator of new Array(12)) {
                await insertSample();
            }
            const paginationInfo: PaginationInfo = {
                limit: 10,
                offset: 10
            };
            const historicals = await sut.loadHistoricals(paginationInfo);
            expect(historicals).toHaveLength(2);
        });
        it ('Deve retornar um array vazio caso não exista dados a partir do offset', async () => {
            const { sut } = makeSut();
            for (const iterator of new Array(12)) {
                await insertSample();
            }
            const paginationInfo: PaginationInfo = {
                limit: 10,
                offset: 20
            };
            const historicals = await sut.loadHistoricals(paginationInfo);
            expect(historicals).toHaveLength(0);
        });
    });
});