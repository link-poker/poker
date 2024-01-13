import { FastifyInstance } from 'fastify';
import WebSocket from 'ws';
import { createTestApp } from './app/testApp';
import { createTable, sitDown } from './http/table';

const POKER = {
  BUY_IN: 1000,
  SMALL_BLIND: 10,
  BIG_BLIND: 20,
};

const PLAYERS = {
  ALICE: { NAME: 'alice', STACK: 1000, SEAT: 1 },
  BOB: { NAME: 'bob', STACK: 1000, SEAT: 2 },
};

describe('Poker Test', () => {
  let app: FastifyInstance;
  let serverAddress: string;
  let alice: { id: string; ws: WebSocket };
  let bob: { id: string; ws: WebSocket };

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    serverAddress = testApp.serverAddress;
    const { user: aliceUser, table } = await createTable(app, {
      name: PLAYERS.ALICE.NAME,
      stack: POKER.BUY_IN,
      seatNumber: PLAYERS.ALICE.SEAT,
      currency: 'USDT',
      smallBlind: POKER.SMALL_BLIND,
      bigBlind: POKER.BIG_BLIND,
      buyIn: POKER.BUY_IN,
    });
    const { user: bobUser } = await sitDown(app, table.id, {
      name: PLAYERS.BOB.NAME,
      stack: POKER.BUY_IN,
      seatNumber: PLAYERS.BOB.SEAT,
    });
    alice = {
      id: aliceUser.id,
      ws: new WebSocket(`ws://${serverAddress}/ws/table/${table.id}/user/${aliceUser.id}`),
    };
    bob = {
      id: bobUser.id,
      ws: new WebSocket(`ws://${serverAddress}/ws/table/${table.id}/user/${bobUser.id}`),
    };
  });

  afterAll(() => {
    app.close();
  });

  it('should be able to connect', done => {
    alice.ws.on('open', () => {
      alice.ws.send(JSON.stringify({ type: 'connect', payload: { authToken: '' } }));
    });
    bob.ws.on('open', () => {
      bob.ws.send(JSON.stringify({ type: 'connect', payload: { authToken: '' } }));
    });
    alice.ws.on('message', message => {
      const data = JSON.parse(message.toString());
      expect(data.type).toEqual('connect');
      alice.ws.close();
    });
    bob.ws.on('message', message => {
      const data = JSON.parse(message.toString());
      expect(data.type).toEqual('connect');
      bob.ws.close();
      done();
    });
  });
});
