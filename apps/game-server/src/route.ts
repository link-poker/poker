import { FastifyInstance, FastifyRequest } from 'fastify';
import { SocketStream } from '@fastify/websocket';
import { TableWsController } from './application/controllers/ws/TableWsController';
import { TableHttpController } from './application/controllers/http/TableHttpController';

const registerHttpRoutes = (app: FastifyInstance, tableHttpController: TableHttpController) => {
  app.get('/health', async (request, reply) => {
    reply.send({ status: 'ok' });
  });
  app.post('/tables', tableHttpController.createAsGuest.bind(tableHttpController));
  app.post('/tables/:tableId/sit-down', tableHttpController.sitDownAsGuest.bind(tableHttpController));
};

const registerWsRoutes = (app: FastifyInstance, tableWsController: TableWsController) => {
  app.register(async function (wsApp: FastifyInstance) {
    wsApp.get('/ws/ping', { websocket: true }, (connection: SocketStream, req: FastifyRequest) => {
      connection.socket.on('message', message => {
        connection.socket.send('pong');
      });
    });
    wsApp.get('/ws/table/:tableId/user/:userId', { websocket: true }, tableWsController.handle.bind(tableWsController));
  });
};

export const registerRoutes = (
  app: FastifyInstance,
  tableHttpController: TableHttpController,
  tableWsController: TableWsController,
) => {
  registerHttpRoutes(app, tableHttpController);
  registerWsRoutes(app, tableWsController);
};
