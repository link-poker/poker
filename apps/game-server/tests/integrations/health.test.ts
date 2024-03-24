import { FastifyInstance } from 'fastify';
import { createTestApp } from './app/testApp';
import { dbHealth, health } from './http/health';

describe('Health Test', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
  });

  afterAll(() => {
    app.close();
  });

  it('should respond with ok on /health', async () => {
    const { response, status } = await health(app);
    expect(response.statusCode).toBe(200);
    expect(status).toBe('ok');
  });

  it('should respond with ok on /health/db', async () => {
    const { response, status } = await dbHealth(app);
    expect(response.statusCode).toBe(200);
    expect(status).toBe('ok');
  });
});
