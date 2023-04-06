import request from 'supertest'
import { KnexHelper } from '@/infra/db/knex/helper/KnexHelper';
import { insertSample, makeAccessToken } from '@/utils/TestHelper';

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
        it ('Deve retornar 200 com 9 itens e sem informar o offset', async () => {
            for (const iterator of new Array(12)) {
                await insertSample();
            }
            const accessToken = await makeAccessToken();
            const response = await request(app)
            .get('/api/sample-historicals?limit=9')
            .set('x-access-token', accessToken)
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(9);
        });
        it ('Deve retornar 200 com 2 itens com limit e offset como 10', async () => {
            for (const iterator of new Array(12)) {
                await insertSample();
            }
            const accessToken = await makeAccessToken();
            const response = await request(app)
            .get('/api/sample-historicals?limit=10&offset=10')
            .set('x-access-token', accessToken)
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
        });
        it ('Deve retornar 200 com array vazio caso não tenha registros no banco a a partir do offset informado', async () => {
            for (const iterator of new Array(12)) {
                await insertSample();
            }
            const accessToken = await makeAccessToken();
            const response = await request(app)
            .get('/api/sample-historicals?limit=10&offset=20')
            .set('x-access-token', accessToken)
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(0);
        });
    });
});