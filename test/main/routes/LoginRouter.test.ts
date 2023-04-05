import request from 'supertest'
import app from '@/main/config/app'
import { KnexHelper } from '@/infra/db/knex/helper/KnexHelper';

const defaultAccount = {
    id: 1,
    name: 'Verx',
    email: 'verx@mail.com.br',
    password: '123345'
};

describe('Login Routes', () => {
    beforeAll(async () => {
        await KnexHelper.connect();
        await KnexHelper.runMigrations();
        await KnexHelper.runSeeders();
    });
    afterEach(async () => {
        await KnexHelper.deleteData('accounts');
    });
    afterAll(async () => {
        await KnexHelper.roolbackMigrations();
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