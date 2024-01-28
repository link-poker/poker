import { FastifyInstance } from 'fastify';
import { createTableAsGuest, getTable, sitDownAsGuest } from './http/table';
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

  it('should able to create a table as guest', async () => {
    const { response, user, table } = await createTableAsGuest(app, {
      name: 'test',
      currency: 'USDT',
      smallBlind: 5,
      bigBlind: 10,
      buyIn: 1000,
    });
    expect(response.statusCode).toBe(200);
    expect(user.name).toBe('test');
    expect(table.owner.id).toBe(user.id);
    expect(table.currency).toBe('USDT');
    expect(table.status).toBe('WAITING');
  });

  it('should able to sit down as guest', async () => {
    const { table } = await createTableAsGuest(app, {
      name: 'test',
      currency: 'USDT',
      smallBlind: 5,
      bigBlind: 10,
      buyIn: 1000,
    });
    const { response, user } = await sitDownAsGuest(app, table.id, {
      name: 'test',
      stack: 1000,
      seatNumber: 9,
    });
    expect(response.statusCode).toBe(200);
    expect(user.name).toBe('test');
  });

  it('should able to get table', async () => {
    const { table } = await createTableAsGuest(app, {
      name: 'test',
      currency: 'USDT',
      smallBlind: 5,
      bigBlind: 10,
      buyIn: 1000,
    });
    const { response, table: gotTable } = await getTable(app, table.id);
    expect(response.statusCode).toBe(200);
    expect(gotTable.id).toBe(table.id);
    expect(gotTable.owner.id).toBe(table.owner.id);
    expect(gotTable.currency).toBe(table.currency);
    expect(gotTable.status).toBe(table.status);
    expect(gotTable.poker.bigBlind).toBe(table.poker.bigBlind);
    expect(gotTable.poker.smallBlind).toBe(table.poker.smallBlind);
    expect(gotTable.poker.buyIn).toBe(table.poker.buyIn);
  });
});
