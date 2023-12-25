import { FastifyInstance } from 'fastify';
import { createApp } from '../../src/app';
import { APP_CONFIG } from '../../src/config/app';
import WebSocket from 'ws';

describe('WebSocket Test', () => {
  let app: FastifyInstance;
  let serverAddress: string;

  beforeAll(async () => {
    app = await createApp();
    await app.listen({ port: APP_CONFIG.port, host: APP_CONFIG.host });
    const address = app.server.address();
    if (!address || typeof address === 'string') {
      throw new Error('Server did not start correctly');
    }

    // IPv6アドレスを正しくフォーマットする
    const host = address.family === 'IPv6' ? `[${address.address}]` : address.address;
    serverAddress = `${host}:${address.port}`;
  });

  afterAll(() => {
    app.close();
  });

  it('should create a user via WebSocket', done => {
    const ws = new WebSocket(`ws://${serverAddress}/ws/ping`);

    ws.on('open', () => {
      ws.send('ping');
    });

    ws.on('message', data => {
      const response = data.toString();
      expect(response).toBe('pong');
      ws.close();
      done();
    });
  });
});
