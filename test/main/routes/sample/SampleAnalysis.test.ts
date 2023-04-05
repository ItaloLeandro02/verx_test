import request from 'supertest'
import { KnexHelper } from '@/infra/db/knex/helper/KnexHelper';
import { SampleAnalyzeParams } from '@/domain/usercases/sample';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';

const mockSampleAnalyzeParams = (): SampleAnalyzeParams => ({
    codigoAmostra: "02383322",
    cocaina: 0.678,
    anfetamina: 0.1,
    metanfetamina: 0.1,
    mda: 0.1,
    mdma: 0,
    thc: 0.04,
    morfina: 0.1,
    codeina: 0.1,
    heroina: 0.1,
    benzoilecgonina: 0,
    cocaetileno: 0,
    norcocaina: 0
});

let app: any = null;
describe('Sample Routes', () => {
    beforeAll(async () => {
        await KnexHelper.connect();
        await KnexHelper.runMigrations();
        await KnexHelper.runSeeders();
        app = (await import('@/main/config/app')).default;
    });
    afterEach(async () => {
        await KnexHelper.deleteData('accounts');
    });
    afterAll(async () => {
        await KnexHelper.roolbackMigrations();
        await KnexHelper.disconnect();
    });

    describe('POST / sample-analysis', () => {
        it ('Deve retornar 400 caso o código de amostra seja maior do que oito caracteres', async () => {
            const httpRequest = {
                ...mockSampleAnalyzeParams(),
                codigoAmostra: '123456789'
            } 
            const response = await request(app)
            .post('/api/sample-analysis')
            .send(httpRequest);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ 
                error: new InvalidParamError('codigoAmostra').message
            });
        });
        it ('Deve retornar 400 caso o código de amostra não seja enviado', async () => {
            const httpRequest = {
                ...mockSampleAnalyzeParams(),
                codigoAmostra: undefined
            };
            const response = await request(app)
            .post('/api/sample-analysis')
            .send(httpRequest);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ 
                error: new MissingParamError('codigoAmostra').message
            });
        });
        it ('Deve retornar 200 com o resultado do laudo sendo negativo', async () => {
            const httpRequest = mockSampleAnalyzeParams();
            const response = await request(app)
            .post('/api/sample-analysis')
            .send(httpRequest);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ 
                codigoAmostra: httpRequest.codigoAmostra,
                result: "negativo"
            });
        });
    });
});