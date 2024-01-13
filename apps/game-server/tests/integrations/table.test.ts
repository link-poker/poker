import { FastifyInstance } from 'fastify';
import { createTable, sitDown } from './http/table';
import { createTestApp } from './app/testApp';

describe('Table Test', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
  });

  afterAll(() => {
    app.close();
  });

  it('should able to create a table', async () => {
    const { response, user, table } = await createTable(app, {
      name: 'test',
      stack: 1000,
      seatNumber: 9,
      currency: 'USDT',
      smallBlind: 5,
      bigBlind: 10,
      buyIn: 1000,
    });
    expect(response.statusCode).toBe(200);
    expect(user.name).toBe('test');
    expect(user.stack).toBe(1000);
    expect(user.seatNumber).toBe(9);
    expect(table.currency).toBe('USDT');
    expect(table.smallBlind).toBe(5);
    expect(table.bigBlind).toBe(10);
    expect(table.buyIn).toBe(1000);
  });

  it('should able to sit down', async () => {
    const { table } = await createTable(app, {
      name: 'test',
      stack: 1000,
      seatNumber: 9,
      currency: 'USDT',
      smallBlind: 5,
      bigBlind: 10,
      buyIn: 1000,
    });
    const { response, user } = await sitDown(app, table.id, {
      name: 'test',
      stack: 1000,
      seatNumber: 9,
    });
    expect(response.statusCode).toBe(200);
    expect(user.name).toBe('test');
    expect(user.stack).toBe(1000);
    expect(user.seatNumber).toBe(9);
  });
});
