import request from 'supertest'
import { sign } from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import { KnexHelper } from '@/infra/db/knex/helper/KnexHelper';
import { SampleAnalyzeParams } from '@/domain/usercases/sample';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import env from '@/main/config/env';

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
const makeAccessToken = async (): Promise<string> => {
    const saveParams = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
    await KnexHelper.connection('accounts').insert(saveParams);
    const account = await KnexHelper.connection('accounts').where('email', saveParams.email).first();
    const accessToken = sign({ id: account.id }, env.jwtSecret);
    
    await KnexHelper.connection('accounts').update({ accessToken: accessToken }).where('id', account.id);
  
    return accessToken
  }

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
        await KnexHelper.disconnect();
    });

    describe('POST / sample-analysis', () => {
        it ('Deve retornar 403 caso o token não seja informado', async () => {
            const httpRequest = mockSampleAnalyzeParams(); 
            const response = await request(app)
            .post('/api/sample-analysis')
            .send(httpRequest);
            expect(response.status).toBe(403);
            expect(response.body).toEqual({ 
                error: 'Access denied'
            });
        });
        it ('Deve retornar 400 caso o código de amostra seja maior do que oito caracteres', async () => {
            const accessToken = await makeAccessToken();
            const httpRequest = {
                ...mockSampleAnalyzeParams(),
                codigoAmostra: '123456789'
            } 
            const response = await request(app)
            .post('/api/sample-analysis')
            .set('x-access-token', accessToken)
            .send(httpRequest);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ 
                error: new InvalidParamError('codigoAmostra').message
            });
        });
        it ('Deve retornar 400 caso o código de amostra não seja enviado', async () => {
            const accessToken = await makeAccessToken();
            const httpRequest = {
                ...mockSampleAnalyzeParams(),
                codigoAmostra: undefined
            };
            const response = await request(app)
            .post('/api/sample-analysis')
            .set('x-access-token', accessToken)
            .send(httpRequest);
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ 
                error: new MissingParamError('codigoAmostra').message
            });
        });
        it ('Deve retornar 200 com o resultado do laudo sendo negativo', async () => {
            const accessToken = await makeAccessToken();
            const httpRequest = mockSampleAnalyzeParams();
            const response = await request(app)
            .post('/api/sample-analysis')
            .set('x-access-token', accessToken)
            .send(httpRequest);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ 
                codigoAmostra: httpRequest.codigoAmostra,
                result: "negativo"
            });
        });
        it ('Deve retornar 200 com o resultado do laudo sendo positivo', async () => {
            const accessToken = await makeAccessToken();
            const httpRequest = {
                ...mockSampleAnalyzeParams(),
                mdma: 0.21
            };
            const response = await request(app)
            .post('/api/sample-analysis')
            .set('x-access-token', accessToken)
            .send(httpRequest);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ 
                codigoAmostra: httpRequest.codigoAmostra,
                result: "positivo"
            });
        });
        it ('Deve retornar 200 com o resultado do laudo sendo positivo, cocaína cima do padrão juntamente com benzoilecgonina', async () => {
            const accessToken = await makeAccessToken();
            const httpRequest = {
                ...mockSampleAnalyzeParams(),
                benzoilecgonina: 0.5
            };
            const response = await request(app)
            .post('/api/sample-analysis')
            .set('x-access-token', accessToken)
            .send(httpRequest);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ 
                codigoAmostra: httpRequest.codigoAmostra,
                result: "positivo"
            });
        });
        it ('Deve retornar 200 com o resultado do laudo sendo positivo, cocaína cima do padrão juntamente com cocaetileno', async () => {
            const accessToken = await makeAccessToken();
            const httpRequest = {
                ...mockSampleAnalyzeParams(),
                cocaetileno: 0.5
            };
            const response = await request(app)
            .post('/api/sample-analysis')
            .set('x-access-token', accessToken)
            .send(httpRequest);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ 
                codigoAmostra: httpRequest.codigoAmostra,
                result: "positivo"
            });
        });
        it ('Deve retornar 200 com o resultado do laudo sendo positivo, cocaína cima do padrão juntamente com norcocaina', async () => {
            const accessToken = await makeAccessToken();
            const httpRequest = {
                ...mockSampleAnalyzeParams(),
                norcocaina: 0.5
            };
            const response = await request(app)
            .post('/api/sample-analysis')
            .set('x-access-token', accessToken)
            .send(httpRequest);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ 
                codigoAmostra: httpRequest.codigoAmostra,
                result: "positivo"
            });
        });
    });
});