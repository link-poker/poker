import { SocketStream } from '@fastify/websocket';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { TableHttpController } from './application/controllers/http/TableHttpController';
import { TableWsController } from './application/controllers/ws/TableWsController';
import { WatchTableWsController } from './application/controllers/ws/WatchTableWsController';

const registerHttpRoutes = (app: FastifyInstance, tableHttpController: TableHttpController) => {
  app.get('/health', async (request, reply) => {
    reply.send({ status: 'ok' });
  });
  app.post('/tables', tableHttpController.createAsUser.bind(tableHttpController));
  app.post('/tables/guest', tableHttpController.createAsGuest.bind(tableHttpController));
  app.post('/tables/:tableId/sit-down', tableHttpController.sitDownAsUser.bind(tableHttpController));
  app.post('/tables/:tableId/sit-down/guest', tableHttpController.sitDownAsGuest.bind(tableHttpController));
};

const registerWsRoutes = (
  app: FastifyInstance,
  tableWsController: TableWsController,
  watchTableWsController: WatchTableWsController,
) => {
  app.register(async function (wsApp: FastifyInstance) {
    wsApp.get('/ws/ping', { websocket: true }, (connection: SocketStream, req: FastifyRequest) => {
      connection.socket.on('message', message => {
        connection.socket.send('pong');
      });
    });
    wsApp.get('/ws/table/:tableId/user/:userId', { websocket: true }, tableWsController.handle.bind(tableWsController));
    wsApp.get(
      '/ws/table/:tableId/watch',
      { websocket: true },
      watchTableWsController.handle.bind(watchTableWsController),
    );
  });
};

export const registerRoutes = (
  app: FastifyInstance,
  tableHttpController: TableHttpController,
  tableWsController: TableWsController,
  watchTableWsController: WatchTableWsController,
) => {
  registerHttpRoutes(app, tableHttpController);
  registerWsRoutes(app, tableWsController, watchTableWsController);
};
