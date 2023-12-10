// contest.test.ts
import { FastifyInstance } from 'fastify';
import { createApp } from '../../src/app';

describe('Server Test', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await createApp();
  });

  afterAll(() => {
    app.close();
  });

  it('should respond with pong on /ping', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify({ status: 'ok' }));
  });
});
