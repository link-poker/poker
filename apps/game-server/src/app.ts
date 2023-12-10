import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

export const createApp = async () => {
  const app: FastifyInstance = fastify();

  app.register(cors, {
    origin: '*',
  });

  app.get('/health', async (request, reply) => {
    reply.send({ status: 'ok' });
  });

  return app;
};
