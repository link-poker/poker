import fastify, { FastifyInstance } from 'fastify';
import websocket from '@fastify/websocket';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';
import { UserRepository } from './infrastructure/repositories/db/UserRepository';
import { GameRepository } from './infrastructure/repositories/db/GameRepository';
import { TableRepository } from './infrastructure/repositories/db/TableRepository';
import { UserFactory } from './domain/factories/UserFactory';
import { GameFactory } from './domain/factories/GameFactory';
import { TableFactory } from './domain/factories/TableFactory';
import { UserApplicationService } from './application/services/UserApplicationService';
import { TableHttpController } from './application/controllers/http/TableHttpController';
import { TableWsController } from './application/controllers/ws/TableWsController';
import { TableApplicationService } from './application/services/TableApplicationService';
import { WebSocketApplicationService } from './application/services/WebSocketApplicationService';
import { registerRoutes } from './route';
import { WebSocketService } from './domain/services/WebSocketService';

export const createApp = async () => {
  const prisma = new PrismaClient();
  const userRepository = new UserRepository(prisma);
  const gameRepository = new GameRepository(prisma);
  const tableRepository = new TableRepository(prisma);
  const userFactory = new UserFactory();
  const gameFactory = new GameFactory();
  const tableFactory = new TableFactory();
  const webSocketService = new WebSocketService();
  const userApplicationService = new UserApplicationService(userFactory, userRepository);
  const tableApplicationService = new TableApplicationService(tableFactory, tableRepository, webSocketService);
  const webSocketApplicationService = new WebSocketApplicationService(webSocketService);
  const tableHttpController = new TableHttpController(tableApplicationService, userApplicationService);
  const tableWsController = new TableWsController(tableApplicationService, webSocketApplicationService);

  const app: FastifyInstance = fastify({ logger: true });

  app.register(cors, {
    origin: '*',
  });
  app.register(websocket);

  registerRoutes(app, tableHttpController, tableWsController);

  // close prisma
  app.addHook('onClose', async () => {
    await prisma.$disconnect();
  });
  // const fastify = require('fastify')();
  // fastify.register(require('@fastify/websocket'));
  // fastify.register(async function (fastify: FastifyInstance) {
  //   fastify.get('/ping', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
  //     connection.socket.on('message', (message: string) => {
  //       // message.toString() === 'hi from client'
  //       connection.socket.send('pong');
  //     });
  //   });
  // });

  return app;
};
