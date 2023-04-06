import request from 'supertest'
import { KnexHelper } from '@/infra/db/knex/helper/KnexHelper';

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
    });
});