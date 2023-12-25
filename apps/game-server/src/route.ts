import { FastifyInstance, FastifyRequest } from 'fastify';
import { SocketStream } from '@fastify/websocket';

const registerHttpRoutes = (app: FastifyInstance) => {
  app.get('/health', async (request, reply) => {
    reply.send({ status: 'ok' });
  });
};
const registerWsRoutes = (app: FastifyInstance) => {
  app.register(async function (wsApp: FastifyInstance) {
    wsApp.get('/ws/ping', { websocket: true }, (connection: SocketStream, req: FastifyRequest) => {
      connection.socket.on('message', message => {
        connection.socket.send('pong');
      });
    });
  });
};

export const registerRoutes = (app: FastifyInstance) => {
  registerHttpRoutes(app);
  registerWsRoutes(app);
};
