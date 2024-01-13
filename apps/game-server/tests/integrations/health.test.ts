import { FastifyInstance } from 'fastify';
import { health } from './http/health';
import { createTestApp } from './app/testApp';

describe('Health Test', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
  });

  afterAll(() => {
    app.close();
  });

  it('should respond with pong on /ping', async () => {
    const { response, status } = await health(app);
    expect(response.statusCode).toBe(200);
    expect(status).toBe('ok');
  });
});
