import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import { PrismaClient } from '@prisma/client';
import fastify, { FastifyInstance } from 'fastify';
import { TableHttpController } from './application/controllers/http/TableHttpController';
import { TableWsController } from './application/controllers/ws/TableWsController';
import { WatchTableWsController } from './application/controllers/ws/WatchTableWsController';
import { AuthenticateApplicationService } from './application/services/AuthenticateApplicationService';
import { TableApplicationService } from './application/services/TableApplicationService';
import { UserApplicationService } from './application/services/UserApplicationService';
import { WebSocketApplicationService } from './application/services/WebSocketApplicationService';
import { GameFactory } from './domain/factories/GameFactory';
import { TableFactory } from './domain/factories/TableFactory';
import { UserFactory } from './domain/factories/UserFactory';
import { WebSocketService } from './domain/services/WebSocketService';
import { GameRepository } from './infrastructure/repositories/db/GameRepository';
import { TableRepository } from './infrastructure/repositories/db/TableRepository';
import { UserRepository } from './infrastructure/repositories/db/UserRepository';
import { registerRoutes } from './route';

export const createApp = async () => {
  const prisma = new PrismaClient();
  const userRepository = new UserRepository(prisma);
  const gameRepository = new GameRepository(prisma);
  const tableRepository = new TableRepository(prisma);
  const userFactory = new UserFactory();
  const gameFactory = new GameFactory();
  const tableFactory = new TableFactory();
  const webSocketService = new WebSocketService();
  const authenticateApplicationService = new AuthenticateApplicationService(userRepository);
  const userApplicationService = new UserApplicationService(userFactory, userRepository);
  const tableApplicationService = new TableApplicationService(tableFactory, tableRepository, webSocketService);
  const webSocketApplicationService = new WebSocketApplicationService(webSocketService);
  const tableHttpController = new TableHttpController(
    authenticateApplicationService,
    tableApplicationService,
    userApplicationService,
  );
  const tableWsController = new TableWsController(tableApplicationService, webSocketApplicationService);
  const watchTableWsController = new WatchTableWsController(webSocketApplicationService);

  const app: FastifyInstance = fastify({ logger: true });

  app.register(cors, {
    origin: '*',
  });
  app.register(websocket);

  registerRoutes(app, tableHttpController, tableWsController, watchTableWsController);

  app.addHook('onClose', async () => {
    await prisma.$disconnect();
  });

  return app;
};
