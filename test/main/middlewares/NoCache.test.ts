import request from "supertest";
import app from '@/main/config/app';

describe('NoCache  Middleware', () => {
    it ('Deve desativar o cache', async () => {
        app.post('/test_no_cache', (req, res) => res.send());
        await request(app)
            .get('/test_no_cache')
            .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
            .expect('pragman', 'no-cache')
            .expect('expires', '0')
            .expect('surrogate-control', 'no-store');
    });
});