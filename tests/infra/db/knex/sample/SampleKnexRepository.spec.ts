import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";
import { SampleKnexRepository } from "@/infra/db/knex/sample/SampleKnexRepository";
import { PaginationInfo } from "@/presentation/protocols";
import { insertSample, mockDefaultSampleCuttOffScore, mockSampleAnalyzeParams } from "@/utils/TestHelper";
import { convertSampleParamsToSaveDatabase } from "@/utils/ConvertSampleParamsToSaveDatabase";

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
            expect(sampleCuttOffScore).toEqual(mockDefaultSampleCuttOffScore());
        });
    });
    describe('SaveSampleRepository', () => {
        it ('Deve persistir a amostra recebida no banco com o resultado', async () => {
            const { sut } = makeSut();
            const sampleCuttOffScore = await sut.loadSampleCutOffScore();
            expect(sampleCuttOffScore).toBeTruthy();
            const sampleAnalyze = mockSampleAnalyzeParams();
            const SaveSampleParams = convertSampleParamsToSaveDatabase(sampleAnalyze);
            const result = "positivo";
            await sut.saveSample(SaveSampleParams, result);
            const sampleResult = await KnexHelper.connection('samples').first().orderBy('id', 'desc');
            expect(sampleResult).toBeTruthy();
            expect(sampleResult.id).toBeTruthy();
            expect(sampleResult.result).toBe(result);
            expect(sampleResult.codigoAmostra).toBe(SaveSampleParams.codigoAmostra);
            expect(parseFloat(sampleResult.cocaina)).toBe(SaveSampleParams.cocaina);
            expect(parseFloat(sampleResult.anfetamina)).toBe(SaveSampleParams.anfetamina);
            expect(parseFloat(sampleResult.mda)).toBe(SaveSampleParams.mda);
            expect(parseFloat(sampleResult.thc)).toBe(SaveSampleParams.thc);
            expect(parseFloat(sampleResult.morfina)).toBe(SaveSampleParams.morfina);
            expect(parseFloat(sampleResult.codeina)).toBe(SaveSampleParams.codeina);
            expect(parseFloat(sampleResult.heroina)).toBe(SaveSampleParams.heroina);
            expect(parseFloat(sampleResult.benzoilecgonina)).toBe(SaveSampleParams.benzoilecgonina);
            expect(parseFloat(sampleResult.cocaetileno)).toBe(SaveSampleParams.cocaetileno);
            expect(parseFloat(sampleResult.norcocaina)).toBe(SaveSampleParams.norcocaina);
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