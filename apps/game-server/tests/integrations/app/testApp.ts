import { FastifyInstance } from 'fastify';
import { createApp } from '../../../src/app';
import { APP_CONFIG } from '../../../src/config/app';

export const createTestApp = async (): Promise<{
  app: FastifyInstance;
  serverAddress: string;
}> => {
  const app = await createApp();
  await app.listen({ port: APP_CONFIG.port, host: APP_CONFIG.host });
  const address = app.server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Server did not start correctly');
  }

  // IPv6アドレスを正しくフォーマットする
  const host = address.family === 'IPv6' ? `[${address.address}]` : address.address;
  const serverAddress = `${host}:${address.port}`;
  return { app, serverAddress };
};
