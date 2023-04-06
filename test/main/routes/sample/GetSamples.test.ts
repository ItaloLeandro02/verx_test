import request from 'supertest'
import { faker } from '@faker-js/faker';
import { sign } from 'jsonwebtoken';
import { KnexHelper } from '@/infra/db/knex/helper/KnexHelper';
import env from '@/main/config/env';

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
    return accessToken;
};
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
        await KnexHelper.deleteData('samples');
    });
    afterAll(async () => {
        await KnexHelper.disconnect();
    });

    describe('GET / sample-historicals', () => {
        it ('Deve retornar 403 caso o token não seja informado', async () => {
            const response = await request(app)
            .get('/api/sample-historicals')
            expect(response.status).toBe(403);
            expect(response.body).toEqual({ 
                error: 'Access denied'
            });
        });
        it ('Deve retornar 200 com a quantidade mínima caso limit e offset não sejam informados', async () => {
            for (const iterator of new Array(12)) {
                await insertSample();
            }
            const accessToken = await makeAccessToken();
            const response = await request(app)
            .get('/api/sample-historicals')
            .set('x-access-token', accessToken)
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(5);
        });
    });
});