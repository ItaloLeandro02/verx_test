import { KnexHelper } from "@/infra/db/knex/helper/KnexHelper";
import { SampleKnexRepository } from "@/infra/db/knex/sample/SampleKnexRepository";

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
};;

describe('SampleKnexRepository', () => {
    beforeAll(async () => {
        await KnexHelper.connect();
        await KnexHelper.runMigrations();
        await KnexHelper.runSeeders();
    });
    afterEach(async () => {
        await KnexHelper.deleteData('sample_cut_off_scores');
    });
    afterAll(async () => {
        await KnexHelper.roolbackMigrations();
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
});