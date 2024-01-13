import { FastifyInstance } from 'fastify';
import WebSocket from 'ws';
import { createTestApp } from './app/testApp';

describe('Ping Test', () => {
  let app: FastifyInstance;
  let serverAddress: string;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    serverAddress = testApp.serverAddress;
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
