import { FastifyInstance } from 'fastify';
import { createTableAsGuest } from './http/table';
import { createTestApp } from './app/testApp';
import { getUser } from './http/user';

describe('Table Test', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
  });

  afterAll(() => {
    app.close();
  });

  it('should able to get user', async () => {
    const { user } = await createTableAsGuest(app, {
      name: 'test',
      currency: 'USDT',
      smallBlind: 5,
      bigBlind: 10,
      buyIn: 1000,
    });
    const { response, user: gotUser } = await getUser(app, user.id);
    expect(response.statusCode).toBe(200);
    expect(gotUser).toEqual(user);
  });
});
