import request from 'supertest';
import App from '../../../app';

it('responds with details about the current auth', async () => {
  const cookie = (await global.signin()) as any;

  const response = await request(App)
    .get('/api/auths/currentAuth')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentAuth.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(App)
    .get('/api/auths/currentAuth')
    .send()
    .expect(200);

  expect(response.body.currentAuth).toEqual(null);
});
