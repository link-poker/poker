import { FastifyInstance } from 'fastify';
import WebSocket from 'ws';
import { createTestApp } from './app/testApp';
import { createTableAsGuest, sitDownAsGuest } from './http/table';

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
    const {
      user: aliceUser,
      authToken: aliceAuthToken,
      table,
    } = await createTableAsGuest(app, {
      name: PLAYERS.ALICE.NAME,
      currency: 'USDT',
      smallBlind: POKER.SMALL_BLIND,
      bigBlind: POKER.BIG_BLIND,
      buyIn: POKER.BUY_IN,
    });
    const { user: bobUser, authToken: bobAuthToken } = await sitDownAsGuest(app, table.id, {
      name: PLAYERS.BOB.NAME,
      stack: POKER.BUY_IN,
      seatNumber: PLAYERS.BOB.SEAT,
    });
    alice = {
      id: aliceUser.id,
      ws: new WebSocket(
        `ws://${serverAddress}/ws/table/${table.id}/user/${aliceUser.id}?authToken=${aliceAuthToken.authToken}`,
      ),
    };
    bob = {
      id: bobUser.id,
      ws: new WebSocket(
        `ws://${serverAddress}/ws/table/${table.id}/user/${bobUser.id}?authToken=${bobAuthToken.authToken}`,
      ),
    };
  });

  afterAll(() => {
    app.close();
  });

  it('should be able to connect', done => {
    alice.ws.on('open', () => {
      alice.ws.send(JSON.stringify({ kind: 'ENTER' }));
    });
    bob.ws.on('open', () => {
      bob.ws.send(JSON.stringify({ kind: 'ENTER' }));
    });
    alice.ws.on('message', message => {
      const data = JSON.parse(message.toString());
      expect(data.kind).toEqual('ENTER');
      alice.ws.close();
    });
    bob.ws.on('message', message => {
      const data = JSON.parse(message.toString());
      expect(data.kind).toEqual('ENTER');
      bob.ws.close();
      done();
    });
  });
});
