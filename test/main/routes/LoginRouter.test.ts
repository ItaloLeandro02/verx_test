import request from 'supertest'
import { KnexHelper } from '@/infra/db/knex/helper/KnexHelper';

const defaultAccount = {
    id: 1,
    name: 'Verx',
    email: 'verx@mail.com.br',
    password: '123345'
};
let app: any = null;
describe('Login Routes', () => {
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

    describe('POST / login', () => {
        it ('Deve retornar 200 em caso de sucesso', async () => {
            await request(app)
            .post('/api/login')
            .send({
                email: defaultAccount.email,
                password: defaultAccount.password
            })
            .expect(200)
        });
        it ('Deve retornar 401 caso as credencias não sejam válidas', async () => {
            await request(app)
            .post('/api/login')
            .send({
                email: defaultAccount.email,
                password: defaultAccount.password
            })
            .expect(401)
        });
    });
});