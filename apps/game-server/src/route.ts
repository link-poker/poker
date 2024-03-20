import { SocketStream } from '@fastify/websocket';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { TableHttpController } from './application/controllers/http/TableHttpController';
import { TableLogHttpController } from './application/controllers/http/TableLogHttpController';
import { UserHttpController } from './application/controllers/http/UserHttpController';
import { TableWsController } from './application/controllers/ws/TableWsController';
import { WatchTableWsController } from './application/controllers/ws/WatchTableWsController';

const registerHttpRoutes = (
  app: FastifyInstance,
  tableHttpController: TableHttpController,
  tableLogHttpController: TableLogHttpController,
  userHttpController: UserHttpController,
) => {
  app.get('/health', async (request, reply) => {
    reply.send({ status: 'ok' });
  });
  app.get('/health/db', async (request, reply) => {
    const prisma = new PrismaClient();
    await prisma.$connect();
    await prisma.$disconnect();
    reply.send({ status: 'ok' });
  });
  app.post('/tables', tableHttpController.createAsUser.bind(tableHttpController));
  app.post('/tables/guest', tableHttpController.createAsGuest.bind(tableHttpController));
  app.post('/table/:tableId/sit-down', tableHttpController.sitDownAsUser.bind(tableHttpController));
  app.post('/table/:tableId/sit-down/guest', tableHttpController.sitDownAsGuest.bind(tableHttpController));
  app.get('/table/:tableId', tableHttpController.getTable.bind(tableHttpController));
  app.get('/table/:tableId/logs', tableLogHttpController.getTableLog.bind(tableLogHttpController));
  app.get('/user/:userId', userHttpController.getUser.bind(tableHttpController));
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
  tableLogHttpController: TableLogHttpController,
  userHttpController: UserHttpController,
  tableWsController: TableWsController,
  watchTableWsController: WatchTableWsController,
) => {
  registerHttpRoutes(app, tableHttpController, tableLogHttpController, userHttpController);
  registerWsRoutes(app, tableWsController, watchTableWsController);
};
